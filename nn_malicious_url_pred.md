---
layout: default
---

## Neural Network for Malicious Url Predicting (In development) | Python, TensorFlow, Deep Learning, Data Engineering

This neural network, built and trained from scratch using TensorFlow, predicts whether URLs gathered from the wild are malicious or benign. The model was initially trained on Kaggle's Malicious URL Dataset, and I'm currently working on enhancing its capabilities by incorporating learning rate decay, an F1 score to better assess metrics, and my own collected data from 'https://urlhaus.abuse.ch/'. Thus, I must state that this project is still in development, but I would say it is about 85% completed and usable to accurately predict malicious urls from "the wild". 

The idea behind this project stems from the growing sophistication of phishing attacks and malicious websites, aswell as from our usually bad human performance when faced with social engineering. Also, traditional blacklist approaches often fail to detect new or modified malicious URLs, creating a need for more dynamic, intelligent detection methods. If not, it's going to be an endless game of cat and mouse. 

As far as results, the model has demonstrated acceptable performance metrics on the test set, indicates strong real-world applicability. Indeed, this neural network could serve as a valuable component in a company's security infrastructure, particularly for real-time threat detection and prevention. After all, in cybersecurity:

"Prevention is better than cure."

However, this kind of apps already exists, so I'm not claiming to reinvent the wheel as the saying goes. The primary objective here is to demonstrate a way to leverage machine learning to engineer more robust, adaptive cybersecurity solutions. 

With that being said, the project is divided in 5 phases and it is being devolped using a Jupyter Notebook and dividing the neural network in individual components using custom functions, each one commented and explained. I made this choice makes the code easier to understand, debug, and tweak individual components (such as changing activation functions, model architecture, or hyperparameters) without risking the entire NN. Furthermore, that modular structure streamlines repurposing parts of the code in other machine learning projects, especially when using similar preprocessing or model evaluation steps. This is particularly helpful in cybersecurity, where some components of this neural network can be applied to apply similar models for other tasks like phishing detection, malware classification, or anomaly detection. Last, but not least, using this approach makes it possible to call the complete neural network training and prediction pipeline in just a few lines!

### Phase 0: Importing Modules

In this phase I imported the necessary modules for the project: 

* 'pandas': handles the csv data of the database.
* 'numpy':  helps in calculating class weights weights.
* 'sklearn': splits the data into training, cross validation and test sets; and adds class weights.
* 'tensorflow': builds, trains, evaluates and tests the model. Also, allows to tokenize data before feeeding it to the model.
* 'matplotlib': illustrates evaluations of the model's performance with graphics.

```python
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
from tensorflow.keras.models import Sequential
from tensorflow.keras import Input
from tensorflow.keras.layers import Dense,Dropout,BatchNormalization,Activation
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.callbacks import EarlyStopping
import matplotlib.pyplot as plt
```

### Phase 1: Data loading, Data Spliting and Url Preprocessing

In this phase I define the custom functions to load the data, split it and preprocess the urls using tokenization:

**1. Data loading using 'pandas'**

```python
def load_data(filepath):
    
    """
    Load URL data from CSV file
    Args: 
    Filepath representing location of csv doc.
    Returns: 
    Features X (URLs) and y (labels).
    """
    
    #Use Pandas read_csv method to prepare urldata.csv
    data=pd.read_csv(filepath)
    #Define X and y from "data" 
    #Extract values from 'url' column to a numpy array
    X=data['url'].values
    #Use .map to replace labels with 0's or 1's. Also .values to transform pandas series into numpy arrays.
    y=data['label'].map({'benign':0,'malicious':1}).values 
    #Return the values of X and y
    return X,y
```

**2. Data Splitting using 'sklearn'**

```python
def split_data(X,y,test_size,random_state):
    '''
    Splits data into training and test sets.
    Args: 
    X_preprocessed (tokenized urls), y (labels), test_size (size of test data in %), random_state (shuffling of the data befor spliting).
    Returns: 
    X_train,X_test,y_train,y_test (training urls, test urls, train labels, test labels).
    '''
    
    #Use sklearn's train_test_split to create a test data set
    X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=test_size,random_state=random_state)
    #Return train and test data sets
    return X_train,X_test,y_train,y_test
```

**3. Preprocessing the data (urls) using 'tensorflow.keras.Tokenizer'**

```python

tokenizer=None # defined the tokenizer as a global variable to avoid fitting it many times and botching the model's results

def preprocessor_urls(urls):
    """
    Convert URLs to numerical features using tokenization.
    Args: 
    Urls exctracted from data set in variable X.
    Returns: 
    Urls preprocessed with tokenization X_preprocessed.
    """
    #Call global tokenizer to apply it just once in training
    global tokenizer
    #Keras tokenizer to tokenize each character in the URLs
    #"num_words" set to 1000 so that the model only focuses on the most frequent unique tokens, thus avoiding slow training and overfitting.
    #"char_level" ser to "True" so that the preprocessor represents urls with individual characters.
    if tokenizer is None:
        tokenizer=tf.keras.preprocessing.text.Tokenizer(num_words=1000,char_level=True)
        #Fit the tokenizer on the URLs
        tokenizer.fit_on_texts(urls)
    #Return the tokenized urls as a binary Matrix
    X_preprocessed=tokenizer.texts_to_matrix(urls, mode='binary')
    #Return preprocessed data
    return X_preprocessed #X_preprocessed
```

### Phase 2: Creating, Training, and Testing model Functions

In this phase I define the custom functions to create, train and test the model.

**4. Creating the Model using 'TensorFlow'**

In this function there are actually two models. The first is the shallower initial architecture and is commented because it's results were not acceptable. So, I created a second more deep architecture that added more 'Dense' layers, with the addition of 'BatchDrop' to avoid overrelying in particular units, and 'BatchNormalization' for more efficient training and reducing risks of overfitting to the training data. 

Another note concerning the architecture: I chose to use mainly 'relu' activations for a number of reasons. First, because its non-linearity and simplicity reduces computational efficiency, in contrast of using tanh for example; it also helps mitigate vanishing gradients, as it doesn't "caps" positive values; furthermore, since negative values are output as zero in 'relu', it produces sparse activations which reduce layer interdependency and improves the learning efficiency of learned features. Not only that, when combined with 'BatchNormalization', on the one hand, it mitigates "dead RelUs", that is neurons always outputing 0, as outputs are normalized close to 0; and on the other hand, it allows for more aggressive learning rates, thus speeding up convergence. Finnaly, I chose 'Dense' layers, because they allow each neuron to connect to every neuron in the previous layer, making them very effective for learning complex representations, such as malicious urls.

```python
def create_model(input_shape): #Call: model=create_model(X_train_preprocessed.shape[1:])
    """
    Create a neural network for URL classification
    
    Args: 
    input_dim (Shape of a single input sample (e.g., (1000,)) (X_train_preprocessed.shape[1:])
        
    Returns: 
    tf.keras.Model  (Compiled neural network model)
    """    
    #Create the NN using a Sequential model of Dense and Dropout layers
    #MODEL 1
    #model=Sequential([              
        #First Dense Layar
        #Dense(units=128,activation='relu',input_shape=input_shape,name='Dense_1'),
        #First Droput Layer
        #Dropout(0.3,name='Dropout_1'),
        #Second Dense Layer
        #Dense(units=64,activation='relu',name='Dense_2'),
        #Second Dropout Layer
        #Dropout(0.3,name='Dropout_2'),
        #Third Dense Layer
        #Dense(units=32,activation='relu',name='Dense_3'),
        #Third Dropout Layer
        #Dropout(0.3,name='Dropout_3'),
        #Dense Output Layer
        #Dense(1,activation='sigmoid',name='Output')        
    #],name='Neural_Natwork_for_Malicious_Url_Detection')
    #Model 2
    model=Sequential([
        #Input layer
        Input(shape=input_shape),
         # First Dense Layer
        Dense(units=128, name='Dense_1'), #128
        BatchNormalization(name='BatchNorm_1'),
        Activation('relu', name='Activation_1'),
        Dropout(0.3, name='Dropout_1'),
    
        # Second Dense Layer
        Dense(units=256, name='Dense_2'), #64
        BatchNormalization(name='BatchNorm_2'),
        Activation('relu', name='Activation_2'),
        Dropout(0.3, name='Dropout_2'),
    
        # Third Dense Layer
        Dense(units=128, name='Dense_3'), #32
        BatchNormalization(name='BatchNorm_3'),
        Activation('relu', name='Activation_3'),
        Dropout(0.3, name='Dropout_3'),

        # ADDED Fourth Dense Layer
        Dense(units=64, name='Dense_4'), 
        BatchNormalization(name='BatchNorm_4'),
        Activation('relu', name='Activation_4'),
        Dropout(0.3, name='Dropout_4'),

        # ADDED Fifth Dense Layer
        Dense(units=32, name='Dense_5'), 
        BatchNormalization(name='BatchNorm_5'),
        Activation('relu', name='Activation_5'),
        Dropout(0.3, name='Dropout_5'),
        
        # Dense Output Layer
        Dense(1, activation='sigmoid', name='Output')
    ], name='Neural_Network_for_Malicious_Url_Detection')

    #Compile the Model to configure it for training
    #model.compile(
        #optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        #loss=tf.keras.losses.BinaryCrossentropy(),
        #metrics=['accuracy', 'precision', 'recall']
    #)

    return model
```

