# -*- coding: utf-8 -*-
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
import logging
from algorithems.abstractclassifier import AbstractClassifier
from sklearn.model_selection import GridSearchCV 
from sklearn.model_selection import RandomizedSearchCV

#evtl raus?
from scipy.stats import uniform as sp_rand

class SupportVectorMachine(AbstractClassifier):

    def __init__(self):
        AbstractClassifier.__init__(self)
        self.logger = logging.getLogger(__name__)

    def train(self, texts, classes):
        self.logger.debug("Start training...")
        
        model = Pipeline([('vect', self.vectorizer),
                          ('clf', SGDClassifier(loss='hinge', penalty='l2', alpha=1e-3, n_iter=5, random_state=42, n_jobs=-1)),
                          ])
        self.classificator = model.fit(texts, classes)
        self.logger.debug("Finished training.")
        
    def tune_parameters(self, texts, classes):
        # Help:
        # http://scikit-learn.org/stable/modules/grid_search.html#tuning-the-hyper-parameters-of-an-estimator
        # http://machinelearningmastery.com/how-to-tune-algorithm-parameters-with-scikit-learn/
        self.logger.debug("Start parameter tuning...")
        model = Pipeline([('vect', self.vectorizer),
                          ('clf', SGDClassifier(loss='hinge', penalty='l2', alpha=1e-3, n_iter=5, random_state=42, n_jobs=-1)),
                          ])
        
        # Implement more!
        
        #parameters = {'clf__alpha': (1e-1, 1e-4) }
        #gs_clf = GridSearchCV(model, parameters, n_jobs=-1)
        #gs_clf = gs_clf.fit(texts, classes)
        
        #param_grid = {'alpha': sp_rand()}
        parameters = {'clf__alpha': sp_rand() }
        # create and fit a ridge regression model, testing random alpha values

        # use all Cores!
        gs_clf = RandomizedSearchCV(model, parameters, 1000, n_jobs=-1)
        gs_clf = gs_clf.fit(texts, classes)

        
        self.logger.info("Best Score: " + str(gs_clf.best_score_))
        self.logger.info("Best fitting Parameters: " )
        for param_name in sorted(parameters.keys()):
            self.logger.info("%s: %r" % (param_name, gs_clf.best_params_[param_name]))
        self.logger.debug("Finished parameter tuning...")
        
    def get_name(self):
        return "svm"
