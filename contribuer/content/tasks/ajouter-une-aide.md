---
title: 🛠 Testez l'ajout d'une aide et dites nous là où ça cloche! 😅
duration: 60
---

Intro TODO 5 minutes max

## Choisir une première aide - 5 minutes grand max

TODO

## Préparer l'environnement de travail - 10 minutes max

### Se créer un compte sur GitHub - 3 minutes max

GitHub est une plateforme qui facilite la collaboration autour du code source ouvert comme c'est le cas pour le code de Mes Aides.

Lorsque des produits, services en ligne sont développés de façon ouverte, de nombreux outils facilitant la collaboration sont mis à disposition gratuitement.

Nous vous conseillons de vous créer un compte **personnel**, en effet, l'activité d'un compte GitHub est un actif pour les personnes travaillant dans le numérique.

Pour vous inscrire, c'est [ici](https://github.com/join?source=contribuer.mes-aides.org).

- Username/Email/Mot de passe
- « Complete Setup »
- « Skip »
- Validez votre email

TODO Capture d'écran

### Lancer un environnement de travail en ligne - 4 minutes max

Avec ce compte, vous allez pouvoir avoir un environnement de travail fonctionnel en quelques minutes en utilisant GitPod.

GitPod est un service en ligne qui permet de créer un tel environnement dans votre navigateur sans avoir besoin d'installer quoi que ce soit. Ce n'est pas une solution pour le long terme mais c'est extrêmement pratique lorsque l'on souhaite expérimenter.

https://gitpod.io/#https://github.com/mes-aides/openfisca-france-local

- « Login with GitHub and start coding »
- « Authorize gitpod-io »
- Cochez « I agree to the terms of service » et validez

Capture d'écran

Sur cet écran, nous allons commencer par décrire les 3 parties les plus importantes
- sur la gauche, il y a les fichiers et les dossier.
- en bas, il y a ce qu'on appelle un terminal. C'est un outil qui permet de communiquer avec l'ordinateur. Pour donner un exemple :
- Cliquez dans la zone en bas (n'importe où dans la zone).
- Le petit carré noir va devenir gris pour indiquer que nous sommes bien dans la zone.
- Écrivez « date », cela devrait aussi s'afficher dans la zone
- Appuyez sur la touche « Entrée » de votre clavier.
- Cela devrait faire apparaître, la date et l'heure actuelle (en anglais).
  - Au moment de l'écriture de ce document, cela affiche `Wed 06 May 2020 02:51:06 PM UTC`.

Écrire « date » dans un terminal et appuyer sur « Entrée » est souvent appelé « lancer la commande `date` » ou encore « exécuter la commande `date` ».

C'est bien de pouvoir demander à l'ordinateur d'afficher la date et l'heure mais ce n'est pas vraiment pour ça que vous êtes là. Continuons.

### Vérifier que votre environnement est fonctionnel - 2 minutes max

Pour cela, vous pouvez lancer la commande `openfisca_local_test tests/test_dispositif.yml`. Vous pouvez copier-coller le texte depuis ce document (avec votre clavier et les combinaisons Ctrl+C, Ctrl+V).

Cela devrait écrire dans le terminal quelque chose comme ça :

```console
====================== test session starts ======================
platform linux -- Python 3.8.2, pytest-5.4.1, py-1.8.1, pluggy-0.13.1
rootdir: /workspace/openfisca-france-local
plugins: pylama-7.7.1
collected 1 item

tests/test_dispositif.yml .

======================= warnings summary ========================
/workspace/.pip-modules/lib/python3.8/site-packages/openfisca_core/tools/test_runner.py:245
  /workspace/.pip-modules/lib/python3.8/site-packages/openfisca_core/tools/test_runner.py:245: PytestDeprecationWarning: direct construction of YamlFile has been deprecated, please use YamlFile.from_parent
    return YamlFile(path, parent, self.tax_benefit_system, self.options)

/workspace/.pip-modules/lib/python3.8/site-packages/openfisca_core/tools/test_runner.py:102
  /workspace/.pip-modules/lib/python3.8/site-packages/openfisca_core/tools/test_runner.py:102: PytestDeprecationWarning: direct construction of YamlItem has been deprecated, please use YamlItem.from_parent
    yield YamlItem('', self, self.tax_benefit_system, test, self.options)

-- Docs: https://docs.pytest.org/en/latest/warnings.html
================= 2 passed, 2 warnings in 0.02s =================
```

## Comprendre l'intérêt des tests - 10 minutes max

Nous allons revenir plus en détails sur ce que vous venez de faire.

La commande `openfisca_local_test tests/test_dispositif.yml` s'est terminée avec un message qui ressemble à
```console
--------------- 2 passed --------------------
```

Cela signifie que 2 deux tests ont été exécutés avec succès.

Ces deux tests sont dans le fichier `tests/test_dispositif.yml`. Vous pouvez utiliser l'explorateur de fichiers de gauche pour accéder à ce fichier. En cliquant sur :
- « tests » puis
- « test_dispositif.yaml ».

Le contenu du fichier devrait apparaître au centre de votre fenêtre. Cela devrait ressembler à ça (avec des couleurs différentes) :

```yaml
- period: 2018-01
  input:
    age: 18
  output:
    test_dispositif: true

- period: 2018-01
  input:
    age: 0
  output:
    test_dispositif: false
```

Les deux tirets représentent le début de chaque test. Chacun comporte :
- une période
- des valeurs de variables en entrée `input` et
- des valeurs de variables en sortie `output`

Dans le premier test, on indique `18` pour la variable `age` (spoiler alert : c'est un âge en année) et **on s'attend en sortie** à ce que la valeur de la variable `test_dispositif` soit égale à *true* ou *vrai* en français.
Dans le second test, on donne un âge de 0 et on s'attend à ce que `test_dispositif` vaut *false* ou *faux* en français.

Maintenant, on va remplacer la valeur de `age` dans le second test par `17`. Il faut enregistrer les modifications en cliquant sur « File » et « Save » ou avec le clavier Ctrl+S. Ensuite, lancez à nouveau la commande `openfisca_local_test tests/test_dispositif.yml`.

Cette fois-ci, le résultat ne devrait plus afficher `2 passed` mais `1 failed, 1 passed`. En regardant en détail, il est indiqué qu'il y a une erreur avec le second test. La valeur **attendue** est _false_ (ou 0) alors que la valeur **obtenue** est _vrai_ (ou 1).

Pour davantage comprendre ce qui se passe regardons un second fichier `openfisca_france_local/test_dispositif.py` (vous pouvez toujours y accéder à partir de l'explorateur de fichier de gauche).

```python
 # -*- coding: utf-8 -*-
from openfisca_france.model.base import Individu, Variable, MONTH


class test_dispositif(Variable):
    value_type = bool
    entity = Individu
    definition_period = MONTH
    label = u"Variable de test pour l'extension"

    def formula(individu, period):
        return individu('age', period) > 0
```

La ligne `class test_dispositif(Variable):` indique la création d'une variable intitulée `test_dispositif`.

Les deux dernières lignes indiquent comment cette variable est calculée, `individu('age', period) > 0` indique que la valeur sera vraie si l'âge est strictement supérieur à zéro et faux dans le cas contraire.

Pour permettre au seconde test que nous avons modifié d'être valide, nous pourrions modifier le calcul de la variable `test_dispositif`. En remplaçant `return individu('age', period)` par `return individu('age', period) >= 18` par exemple. Dans ce cas-là, on ne s'intérresse pas à savoir si l'individu est né (âge > 0) mais si cet individu à la majorité légale (âge >= 18).

Vous pouvez en faire l'expérience, en modifiant le fichier, le sauvegardant puis en lançant la commande `openfisca_local_test tests/test_dispositif.yml`.

Normalement, le résultat finit à nouveau par `----------- 2 passed -------------`.

Cet exercice peut sembler être un détour par rapport à l'ajout d'une aide mais la compréhension de la logique de test est primordiale.


## Implémenter la première règle - 15 minutes

### Créer un premier fichier de test

Il y a un dossier intitulé `tests` à la racine du dossier principal. En fonction de votre administration, vous pouvez choisir le meilleur sous-dossier&nbsp;:
- communes
- départements
- métropoles
- régions

Vous pouvez regarder les fichiers existants et essayer de reprendre les mêmes conventions.

- Bouton-droit sur le dossier dans lequel vous voulez créer le fichier.
- Indiquer le nom du fichier avec comme extension **`.yaml`** par exemple `mon_aide.yaml`.


### Décrire un premier test

Pour commencer, créer le fichier `tests\test_mon_aide.yml`, avec un clic droit sur `tests` dans l'explorateur de fichiers puis en indiquant `test_mon_aide.yml` comme nom du nouveau fichier.

Dans l'espace au centre, le fichier encore vide a été créé, vous pouvez y copier le contenu suivant :

```yaml
period: 2018-01
input:
  age: 0
output:
  mon_aide: false
```

En lançant la commande `openfisca_local_test tests/test_mon_aide.yaml`, vous devriez obtenir une erreur (`1 failed`) avec un message qui indique

```console
You tried to calculate or to set a value for variable 'mon_aide', but it was not found in the loaded tax and benefit system (openfisca-france@48.9.5).
```

Cela signifie que la variable `mon_aide` n'existe pas encore. Effectivement, nous ne l'avons pas encore créée. Pour cela, il faut créer un nouveau fichier.

Par exemple `openfisca_france_local/mon_aide.py`, pour commencer vous pouvez y copier le contenu suivant :

```python
 # -*- coding: utf-8 -*-
from openfisca_france.model.base import Individu, Variable, MONTH


class mon_aide(Variable):
    value_type = bool
    entity = Individu
    definition_period = MONTH
    label = u"Variable de test pour l'extension"

    def formula(individu, period):
        return individu('age', period) > 0
```

En lançant à nouveau la commande `openfisca_local_test tests/test_mon_aide.yaml`, il ne devrait plus y avoir d'erreur et le résultat devrait se terminait avec `----------- 1 passed -----------`.

Cela étant dit, cette variable ne fait pas encore ce que vous attendez d'elle.
Arrêtons-nous là pour le moment.

## Partager avec nous vos premiers travaux - 5 minutes

Choisir les fichiers à partager

4 quatres devraient être affichés

Ne pas prendre les fichiers

Commit

Push

Ouvrir une pull request

## Ajouter des informations textuelles sur votre aide - 5 minutes
