# Ausarbeitung

## Vorwort
In diesem Dokument befinden sich die theoretischen Inhalte für das _TwitterMiner_ Projekt. Das Projekt befasst sich mit der Klassifikation von Tweets. Ergebnis der Klassifikation ist eine Sentiment Analyse, dass heißt es wird bestimmt, ob ein Tweet eine positive oder eine negative Meinung enthält. Das Projekt umfasst drei verschiedene Klassifizierungsmethoden: _Bayes-_, _Support Vector Machine-_ und _Decision Tree-Klassifikation_. Die Ergebnisse der unterschiedlichen Methoden werden auf der Weboberfläche für einzelne Tweets und für Hashtags angegeben.

Die nachfolgenden Kapitel befassen sich mit der Datenvorverarbeitung, den Klassifikationsmethoden und abschließend mit einer Evaluation.

## Einleitung

### Knowledge Discovery in Databases (KDD)
(Daniel)
- Diagramm + beschreiben
- Einordnung in unser Projekt

### Datenvorverarbeitung
(Yannick)
- Stop word removal
- Stemming
- Tokenization
- Lemmatizing
- (optional) Ausblick auf nicht behandeltes Thema: Normalization

### Übersicht Data Mining Algorithmen
(Sven)
- Tabelle oder Baumdiagramm + kurze Beschreibung
- Einordnung in usner Projekt

## Klassifikationsmethoden
Die nachfolgenden Klassifikationsmethoden verwenden einen Trainingsdatensatz, welcher eine Liste von Tweets mit der dazugehörigen Klassifikation (positiv, negativ) enthält.

### Bayes
(Sven)
- Einleitung
- Geschichte
- Mathematische Grundlagen
    - Bedingte Wahrscheinlichkeiten (posteriori, a priori) 
- Das Theorem
- Rechenbeispiel
- Anwendungsgebiete
- Referenzen


### Support Vector Machine
(Daniel)

- Anwendungsgebiete

- Algorithmus im Detail
-- Ebenendarstellung
-- Bedingungen
-- Abstandsberechnung
-- Optimierungsproblem

- Implementierungen
-- Pseudocode
-- sklearn-Framework


### Decision Tree
(Yannick)

- Grundlagen
    - Allgemeine Definition
    - Pseudocode GenericDecisionTree
    - Split-Kriterien
    - Stoppen und beschneiden
- CART: Classification And Regression Trees
    - Eigenschaften
    - Gini Index als Split-Kriterium
    - CART Klassifikation: Anwendungsbeispiel
- Implementierung
    - sklearn


## Evaluation
(Sven, Daniel, Yannick)
- Tabelle mit Pros und Cons der Klassifikationsmethoden
- Auflistung der Fehlerraten von den Klassifikationsmethoden (Auf einen festgelegten Test-Datensatz)
