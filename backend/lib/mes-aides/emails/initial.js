var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var mustache = require('consolidate').mustache;
var config = require('../../../config');

var index = require('.');

var toBase64 = index.toBase64;
var defaultAttachments = index.defaultAttachments;
var mjml = index.mjml;

function basicBenefitText(b) {
    if (b.labelFunction) {
        return b.labelFunction(b);
    }

    if (b.type === 'bool') {
        return b.label;
    }

    return `${b.label} pour un montant de ${b.montant} € / ${b.isMontantAnnuel ? 'an' : 'mois'}`;
}

var textTemplate = fs.readFileSync(path.join(__dirname, 'templates/initial.txt'), 'utf8');
var mjmlTemplate = fs.readFileSync(path.join(__dirname, 'templates/initial.mjml'), 'utf8');

function renderAsText(followup, benefits) {

    var data = {
        benefitTexts: benefits.map(basicBenefitText),
        returnURL: `${config.baseURL}${followup.returnPath}`,
    };

    return mustache.render(textTemplate, data);
}

function renderAsHtml(followup, benefits) {

    var droits = _.map(benefits, function(droit) {

        var montant = '';
        if (_.isNumber(droit.montant)) {
            var unit = droit.unit || '€';
            var legend = droit.legend || (droit.isMontantAnnuel ? '/ an' : '/ mois');
            montant = `${droit.montant} ${unit} ${legend}`;
        }

        var ctaLink = '';
        var ctaLabel = '';
        if (droit.teleservice) {
            ctaLink = droit.teleservice;
            ctaLabel = 'Faire une demande en ligne';
        } else if (droit.form) {
            ctaLink = droit.form;
            ctaLabel = 'Accéder au formulaire papier';
        } else if (droit.instructions) {
            ctaLink = droit.instructions;
            ctaLabel = 'Accéder aux instructions';
        } else {
            ctaLink = droit.link;
            ctaLabel = 'Plus d\'informations';
        }

        return _.assign({}, droit, {
            imgSrc: '/img/' + droit.provider.imgSrc,
            montant: montant,
            ctaLink: ctaLink,
            ctaLabel: ctaLabel,
        });
    });

    var data = {
        droits: droits,
        baseURL: config.baseURL,
        returnURL: `${config.baseURL}${followup.returnPath}`,
    };

    return mustache.render(mjmlTemplate, data)
        .then(function (templateString) {
            const output = mjml(templateString);
            return {
                html: output.html,
            };
        });
}

function render(followup) {
    var p = followup.populated('situation') ? Promise.resolve(followup) : followup.populate('situation').execPopulate()

    return p.then(f => f.situation.compute())
        .then(function (results) { return results.droitsEligibles; })
        .then(function (benefits) {
            followup.benefits = benefits.map(benefit => ({
                id: benefit.id,
                amount: benefit.montant
            }));
            followup.save();

            return Promise.all([
                renderAsText(followup, benefits),
                renderAsHtml(followup, benefits)
            ]).then(function (values) {
                return {
                    subject: `[${followup.situation._id}] Récapitulatif de votre simulation sur Mes-Aides.org`,
                    text: values[0],
                    html: values[1].html,
                    attachments: values[1].attachments,
                };
            });
        });
}

exports.render = render;
