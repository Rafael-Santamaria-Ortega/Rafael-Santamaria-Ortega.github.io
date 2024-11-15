---
layout: default
---

# Neural Network for Malicious Url Predicting (In development) | Python, TensorFlow, Deep Learning, Data Engineering

This `neural network`, built and trained from scratch using `TensorFlow`, predicts whether URLs gathered from the wild are malicious or benign. The model was initially trained on `Kaggle's Malicious URL Dataset`, and I'm currently working on enhancing its capabilities by incorporating learning rate decay, an F1 score to better assess metrics, and my own collected data from `https://urlhaus.abuse.ch/`. Thus, I must state that this project is still in development, but I would say it is about 85% completed and usable to accurately predict malicious urls from "the wild". 

The idea behind this project stems from the growing sophistication of phishing attacks and malicious websites, aswell as from our usually bad human performance when faced with _social engineering_. Also, traditional blacklist approaches often fail to detect new or modified malicious URLs, creating a need for more dynamic, intelligent detection methods. If not, it's going to be an endless game of cat and mouse. 

As far as results, the model has demonstrated acceptable performance metrics on the test set, indicating strong real-world applicability. Indeed, this `neural network` could serve as a valuable component in a company's security infrastructure, particularly for real-time threat detection and prevention. After all, in cybersecurity:

"Prevention is better than cure."

However, this kind of apps already exists, so I'm not claiming to reinvent the wheel as the saying goes. The primary objective here is to demonstrate a way to leverage machine learning to engineer more robust, adaptive cybersecurity solutions. 

With that being said, the project is divided in 5 phases and it is being devolped using a `Jupyter Notebook` and dividing the `neural network` in individual components using custom functions, each one commented and explained. I made this choice makes the code easier to understand, debug, and tweak individual components (such as changing activation functions, model architecture, or hyperparameters) without risking the entire NN. Furthermore, that modular structure streamlines repurposing parts of the code in other `machine learning` projects, especially when using similar preprocessing or model evaluation steps. This is particularly helpful in `cybersecurity`, where some components of this neural network can be applied to apply similar models for other tasks like phishing detection, malware classification, or anomaly detection. Last, but not least, using this approach makes it possible to call the complete neural network training and prediction pipeline in just a few lines!

## Phase 0: Importing Modules

In this phase I imported the necessary modules for the project: 

* `pandas`: handles the `csv` data of the database.
* `numpy`:  helps in calculating class weights weights.
* `sklearn`: splits the data into training, cross validation and test sets; adds class weights; and adds metrics.
* `tensorflow`: builds, trains, evaluates and tests the model. Also, allows to tokenize data before feeeding it to the model.
* `matplotlib`: illustrates evaluations of the model's performance with graphics.

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

## Phase 1: Data loading, Data Spliting and Url Preprocessing Functios

In this phase I define the custom functions to load the data, split it and preprocess the urls using tokenization:

**1. Data loading using `pandas`**

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

**2. Data Splitting using `sklearn`**

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

**3. Preprocessing the data (urls) using `tensorflow.keras.Tokenizer`**

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

## Phase 2: Creating, Training, and Testing model Functions

In this phase I define the custom functions to create, train and test the model.

**4. Creating the Model using `TensorFlow`**

In this function there are actually two models. The first is the shallower initial architecture and is commented because it's results were not acceptable. So, I created a second more deep architecture that added more `Dense` layers, with the addition of `BatchDrop` to avoid overrelying in particular units, and `BatchNormalization` for more efficient training and reducing risks of overfitting to the training data. 

Another note concerning the architecture: I chose to use mainly `relu` activations for a number of reasons: 

* First, because its non-linearity and simplicity reduces computational efficiency, in contrast of using tanh for example; it also helps mitigate vanishing gradients, as it doesn't "caps" positive values; furthermore, since negative values are output as zero in `relu`, it produces sparse activations which reduce layer interdependency and improves the learning efficiency of learned features. Not only that, when combined with `BatchNormalization`, on the one hand, it mitigates "dead RelUs", that is neurons always outputing 0, as outputs are normalized close to 0; and on the other hand, it allows for more aggressive learning rates, thus speeding up convergence. Finnaly, I chose `Dense` layers, because they allow each neuron to connect to every neuron in the previous layer, making them very effective for learning complex representations, such as `malicious urls`.

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

**5. Training the Model using `TensorFlow`**

This function trains the model using the preprocessed data. Things to note: 

* Class weights have been added using `sklearn` to balance the training data set, because the Kaggle dats over-represents non-malicious urls by a factor of roughly 1 to 4.
* Defines `early stopping`, so as to stop training if loss doesn't reduce significantly.
* The function returns both the trained model, and the history of training in a verbose (verbose=1) manner to get the whole picture of the training.
* The `.fit()` function uses the argument `validation_split` to reserve a small amount of training data (0.1 or 10%), so as to evaluate how well the model does when confronted with new, unseen data. In each iteration of forward propagation and backpropagation the results are validated with said data to prevent overfitting, track performance at each step, and helping determine what hyperparameters to tune.
* The custom function takes `batch_size` and `epochs` as arguments, so as to experiment with different values.

```python
def train_model(X_train_preprocessed,y_train,batch_size,epochs): #Call: model_trained,history=train_model(X_train,y_train,epochs,batch_size)
    """
    Trains a neural network for URL classification
    
    Args:
    input_dim (int): Number of input features from tokenized URLs (1000)
        
    Returns:
    tf.keras.Model: Compiled neural network model
    """
    #Added class weights to increase recall
    class_weights=compute_class_weight('balanced',classes=np.unique(y_train),y=y_train)
    class_weight_dict=dict(enumerate(class_weights))
    
    #Compile the Model to configure it for training
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss=tf.keras.losses.BinaryCrossentropy(),
        metrics=['accuracy', 'precision', 'recall',tf.keras.metrics.F1Score()] # Added F1 score
    )    
    
    #Define aerly stopping
    early_stopping=EarlyStopping(
        monitor='val_loss',
        patience=100,
        restore_best_weights=True)
    
    #Use the .fit method to train the model and save the history of training
    history=model.fit(
        x=X_train_preprocessed, 
        y=y_train,
        batch_size=batch_size, #Size of training data batches
        epochs=epochs, #Times it will perform formward and backwards propagation
        callbacks=[early_stopping], #Added early stopping
        class_weight=class_weight_dict, #Added class weights
        verbose=1,
        validation_split=0.1) #Save a bit of training data as cross-validation data

    return model,history
```

**6. Evaluating the model using `TensorFlow`**

This code evaluates the model using test data and the following metrics: `loss` (measurement of the difference between predictions and actual labels of the test set), `accuracy` (percentage of times the model predicted correctly), `precision` (true positive rate, indicating reliability in malicious URL identification), and `recall` (sensitivity, showing effectiveness in finding actual threats). As I mentioned far above, I am currently working in adding an `F1 score` to better assess the model.

```python
def evaluate_model(X_test_preprocessed,y_test):
    #Define evaluation records to generate
    test_loss,test_accuracy,test_precision,test_recall=trained_model.evaluate(X_test_preprocessed,y_test,verbose=1)
    #Return the metrics
    return f'Loss: {test_loss}',f'Accuracy: {test_accuracy}',f'Precision: {test_precision}',f'Recall:{test_recall}'
```

## Phase 3: Predicting Maliciousness for Previously Unseen URL

In this phase I define a function to predict wether a url found in the wild is likely `Malicious` or `Bening`, using the trained model. Things to note:

* The prediction is a float between 0 (Bening) and 1 (Malicious).
* Defined a singular `url` argument so as to use any url. This implies applying the preprocessing and the global tokenizer to be able to feed the url to the trained model.
* Defined an argument of the function as `threshold` to adjust the value according to needs. Indeed, it can be set lower so as to catalog more urls as malicious, or higher to do the opposite. The answer is a blanced threshold, but in the context of cybersecurity it is better to err in the side of caution. So, it is adviced to set it very low (0.3). Evenmore, the model learns patterns very well, so many times the float is very close to 0 or to 1.

**7. Predicting with the trained model using `TensorFlow`**

```python
def predict_url(url,trained_model,threshold:float,tokenizer): 
    #Preprocess the new url using tf.keras.text.Tokenizer
    preprocessed_url=tokenizer.texts_to_matrix([url],mode='binary') #Removed dependance on the preprocessor function
    #Use the tf.keras.Model.predict method on the new url
    prediction=trained_model.predict(preprocessed_url,verbose=0)[0][0]
    #Set the threshold
    if prediction>threshold:
        return f'{url} is likely MALICIOUS!: {prediction}' #close to 1
    else:
        return f'{url} is likely BENINGN!: {prediction}' #close to 0
```

## Phase 4: Implementing the Model

In this phase I call each function to actually build, train, evaluate the model; and to predict urls gathered "from the wild". 

**8. Building, Training, Evaluating, Predicting using the custom functions**

Something to note: 

* This was implemented using a `Jupyter Notebook`, so each part of the code was run in a separate cell for easier implementation and debugging if needed. However, as I can't represent that functionality, I will transcribe the last results I got. 

```python
#Load data
X,y=load_data('urldata.csv')

#Split data into training and test data
X_train,X_test,y_train,y_test=split_data(X,y,0.1,42)
print(X_train.shape) #Print the shape so as to ensure everything is working fine
```

(405158,)

```python
#Preprocess data
X_train_preprocessed=preprocessor_urls(X_train)
X_test_preprocessed=preprocessor_urls(X_test)
print(X_train_preprocessed.shape[1:])
```

(1000,)

```python
#Create the model
model=create_model((X_train_preprocessed.shape[1:])) #Shape (1000,) representing the 1000 features of each example

#Visualize model
model.summary()
```
```jupyter
Model: "Neural_Network_for_Malicious_Url_Detection"
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━┓
┃ Layer (type)                         ┃ Output Shape                ┃         Param # ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━┩
│ Dense_1 (Dense)                      │ (None, 128)                 │         128,128 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ BatchNorm_1 (BatchNormalization)     │ (None, 128)                 │             512 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Activation_1 (Activation)            │ (None, 128)                 │               0 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Dropout_1 (Dropout)                  │ (None, 128)                 │               0 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Dense_2 (Dense)                      │ (None, 256)                 │          33,024 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ BatchNorm_2 (BatchNormalization)     │ (None, 256)                 │           1,024 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Activation_2 (Activation)            │ (None, 256)                 │               0 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Dropout_2 (Dropout)                  │ (None, 256)                 │               0 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Dense_3 (Dense)                      │ (None, 128)                 │          32,896 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ BatchNorm_3 (BatchNormalization)     │ (None, 128)                 │             512 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Activation_3 (Activation)            │ (None, 128)                 │               0 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Dropout_3 (Dropout)                  │ (None, 128)                 │               0 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Dense_4 (Dense)                      │ (None, 64)                  │           8,256 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ BatchNorm_4 (BatchNormalization)     │ (None, 64)                  │             256 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Activation_4 (Activation)            │ (None, 64)                  │               0 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Dropout_4 (Dropout)                  │ (None, 64)                  │               0 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Dense_5 (Dense)                      │ (None, 32)                  │           2,080 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ BatchNorm_5 (BatchNormalization)     │ (None, 32)                  │             128 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Activation_5 (Activation)            │ (None, 32)                  │               0 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Dropout_5 (Dropout)                  │ (None, 32)                  │               0 │
├──────────────────────────────────────┼─────────────────────────────┼─────────────────┤
│ Output (Dense)                       │ (None, 1)                   │              33 │
└──────────────────────────────────────┴─────────────────────────────┴─────────────────┘
Total params: 206,849 (808.00 KB)
Trainable params: 205,633 (803.25 KB)
Non-trainable params: 1,216 (4.75 KB)
Model input shape: (None, 1000)
```

```python
#Train the model (first test: 10 epochs, 32 batch size)
trained_model,history=train_model(X_train_preprocessed,y_train,256,110) #110 epochs visualization, new deeper NN, class weights
```

(Last 5 epochs of training)

```jupyter
Epoch 105/110
1425/1425 ━━━━━━━━━━━━━━━━━━━━ 9s 6ms/step - accuracy: 0.9098 - loss: 0.2540 - precision: 0.7828 - recall: 0.8463 - val_accuracy: 0.9184 - val_loss: 0.2194 - val_precision: 0.8154 - val_recall: 0.8388
Epoch 106/110
1425/1425 ━━━━━━━━━━━━━━━━━━━━ 11s 8ms/step - accuracy: 0.9115 - loss: 0.2508 - precision: 0.7874 - recall: 0.8453 - val_accuracy: 0.9204 - val_loss: 0.2160 - val_precision: 0.8263 - val_recall: 0.8323
Epoch 107/110
1425/1425 ━━━━━━━━━━━━━━━━━━━━ 9s 6ms/step - accuracy: 0.9107 - loss: 0.2518 - precision: 0.7845 - recall: 0.8453 - val_accuracy: 0.9186 - val_loss: 0.2179 - val_precision: 0.8167 - val_recall: 0.8381
Epoch 108/110
1425/1425 ━━━━━━━━━━━━━━━━━━━━ 9s 6ms/step - accuracy: 0.9089 - loss: 0.2533 - precision: 0.7793 - recall: 0.8465 - val_accuracy: 0.9208 - val_loss: 0.2159 - val_precision: 0.8295 - val_recall: 0.8300
Epoch 109/110
1425/1425 ━━━━━━━━━━━━━━━━━━━━ 9s 6ms/step - accuracy: 0.9099 - loss: 0.2516 - precision: 0.7814 - recall: 0.8486 - val_accuracy: 0.9230 - val_loss: 0.2180 - val_precision: 0.8392 - val_recall: 0.8271
Epoch 110/110
1425/1425 ━━━━━━━━━━━━━━━━━━━━ 9s 6ms/step - accuracy: 0.9109 - loss: 0.2507 - precision: 0.7843 - recall: 0.8468 - val_accuracy: 0.9207 - val_loss: 0.2174 - val_precision: 0.8266 - val_recall: 0.8336
```

```python
#Evaluate the Model results using a Confusion Matrix 
print(f'Results:\n{evaluate_model(X_test_preprocessed,y_test)}')
```

(‘Loss: 0.2092394232749939’,‘Accuracy: 0.9210538268089294’,‘Precision: 0.8312860131263733’,‘Recall:0.8282654285430908’)

These balanced results are the best I got in october 10 2024. The predictons with 'wild urls' are consistent with these results, but to compensate I lowered the threshold to compensate for false negatives. However, in November 15 2024 I retrained the `neural network` and results were a bit more unbalanced:

```jupyter
1407/1407 ━━━━━━━━━━━━━━━━━━━━ 1s 990us/step - accuracy: 0.9254 - loss: 0.2075 - precision: 0.8614 - recall: 0.8101
Results: ('Loss: 0.20970836281776428', 'Accuracy: 0.924430251121521', 'Precision: 0.8572296500205994', 'Recall:0.8095238208770752')
```

Despite this imbalance, `the results are acceptable for application in the real world`, as the model's loss (error rate predicting) is low (0.21), and `predicted correctly 92.4%` of the time (92.4 out of 100 urls). Moreover, `the false positive (14.3%)` and `false negative (19%)` rates are reasonably low, as the metrics of precision and recall demonstrate respectively. However, there is still room for improvement before deploying in a docker container. For instance, adding a `F1 score` to find the balance between precision and recall, penalizing false negatives more harshly, and adding more data to the training set. So, on November 15 2024 I implemented an `F1 score` (referenced in the definition of `train_model`), and got these results:

```python
#Predict unknown URLs from the wild (https://urlhaus.abuse.ch/browse/)
threshold=0.25

url='http://59.88.229.17:60855/bin.sh'
predict_url(url,trained_model,threshold,tokenizer)
```

'http://59.88.229.17:60855/bin.sh is likely MALICIOUS!: 0.9999619126319885'

```python
url='http://117.235.251.101:40567/Mozi.a'
predict_url(url,trained_model,threshold,tokenizer)
```

'http://117.235.251.101:40567/Mozi.a is likely MALICIOUS!: 0.9999975562095642'

```python
url='https://www.claude.ai/'
predict_url(url,trained_model,threshold,tokenizer)
```

'https://www.claude.ai/ is likely BENINGN!: 0.05178939923644066'

```python
url='https://www.semanariolacivilizacion.blogspot.com'
predict_url(url,trained_model,threshold,tokenizer)
```

'https://www.semanariolacivilizacion.blogspot.com is likely BENINGN!: 0.24499544501304626'

```python
#Test a huge list of fresh urls
url_list=[
    'http://64.235.37.148/bins/k.mips',
    'http://64.235.37.148/bins/k.m68k',
    'http://64.235.37.148/bins/k.x86',
    'http://31.172.80.237/qkdjdjj22.i586',
    'http://182.117.69.207:40583/i',
    'http://31.172.83.15/main_arm6',
    'http://31.162.21.98:40024/Mozi.m',
    'http://apitestlabs.com:8888/113681416431447.dll',
    'http://cloudslimit.com:8888/113681416431447.dll',
    'http://dailywebstats.com:8888/225761669829717.dll',
    'https://www.discord.com',
    'http://94.159.113.48:8888/113681416431447.dll',
    'http://87.120.114.132/mirai.arm7',
    'https://chxr.rooms.fierceatfifty.com/orderReview',
    'http://87.120.114.132/mirai.ppc',
    'http://whimar.com/wp-admin/maint/XjoPqhzc228.bin',
    'http://whimar.com/wp-admin/maint/Verificerbarheden.mso',
    'http://185.215.113.16/mine/random.exe',
    'https://wall5tghf6fdg.api.opensourcesaas.org/FcPJXgYD/mine.png',
    'http://87.120.112.102/roze.i586',
    'http://103.72.57.120/TGIF/Jodozocw.dat',
    'https://www.semanariolacivilizacion.blogspot.com',
    'http://172.245.123.25/302/taskhostws.exe',
    'http://157.173.104.153/up/bb.ps1',
    'http://107.170.34.159/morsec/Invoke-Shellcode.ps1',
    'http://157.173.104.153/up/Tool/ChromePass.exe',
    'http://101.99.94.195/mZlaoZbpEVWPJcG210.bin',
    'http://124.248.65.242:8899/sys/20230120_3.bin',
    'http://invictaindia.com/sty/iTSqHIazA174.bin',
    'http://invictaindia.com/sty1/Kajanlggenes.u32',
    'http://8.138.96.41:10050/demon.x64.bin',
    'http://169.1.16.29/swift-bypass-breakpoints.exe',
    'https://www.mincultura.gov.co',
    'http://169.1.16.29/demon.x641.exe',
    'http://169.1.16.29/BidvestBank-Swift-DNS-Tunnel.exe',
    'http://169.1.16.29/BidvestBank-Swift--DNS-evasion-encrypted-no-cloudflare.exe',
    'http://169.1.16.29/LOUD_EYE',
    'http://169.1.16.29/Swift-Beacon-Encrypted.exe',
    'http://178.215.238.13/r.sh',
    'http://91.218.67.59/wget.sh',
    'http://87.120.112.102/update.sh',
    'http://120.25.157.131/qz1.exe',
    'http://185.121.233.82/tt/mips64',
    'https://www.gamebooks.org',
    'http://github.com/vizian123/msfvenomz/raw/main/reddit.exe',
    'https://pastebin.com/raw/FYu4F1YR',
    'http://120.25.157.131/fsx.exe',
    'https://www.ydray.com/get/t/u17290663674746gFwb38bd70be00c5oQ',
    'https://bitbucket.org/awgwrtwa/asss/downloads/1654-INICIO_DEMANDA_LABORAL_JUZGADO_CIVIL_DEL_CIRCUITO_DE_RAMA_JUDICIAL.CAB',
    'http://47.236.122.191/Geek.exe',
    'http://176.111.174.140/ywx.exe',
    'http://web.johnmccrea.com/downloads/67065227a0640_rrrrrrrr.exe'
]
#Start a count
count=0

#Parse urls
for u in url_list:
    #Call custom predict function in every url
    count+=1
    print(count,predict_url(u,trained_model,threshold,tokenizer))
```

1 http://64.235.37.148/bins/k.mips is likely MALICIOUS!: 0.9999939203262329

2 http://64.235.37.148/bins/k.m68k is likely MALICIOUS!: 0.9999939203262329

3 http://64.235.37.148/bins/k.x86 is likely MALICIOUS!: 0.9999952912330627

4 http://31.172.80.237/qkdjdjj22.i586 is likely MALICIOUS!: 0.9999898076057434

5 http://182.117.69.207:40583/i is likely MALICIOUS!: 0.9999951720237732

6 http://31.172.83.15/main_arm6 is likely MALICIOUS!: 0.9999966621398926

7 http://31.162.21.98:40024/Mozi.m is likely MALICIOUS!: 0.9999939799308777

8 http://apitestlabs.com:8888/113681416431447.dll is likely MALICIOUS!: 0.9994522929191589

9 http://cloudslimit.com:8888/113681416431447.dll is likely MALICIOUS!: 0.9998060464859009

10 http://dailywebstats.com:8888/225761669829717.dll is likely MALICIOUS!: 0.026539182290434837

11 https://www.discord.com is likely BENINGN!: 0.07051538676023483

12 http://94.159.113.48:8888/113681416431447.dll is likely MALICIOUS!: 0.9999892711639404

13 http://87.120.114.132/mirai.arm7 is likely MALICIOUS!: 0.9999964237213135

14 https://chxr.rooms.fierceatfifty.com/orderReview is likely MALICIOUS!: 0.523387610912323

15 http://87.120.114.132/mirai.ppc is likely MALICIOUS!: 0.9999939799308777

16 http://whimar.com/wp-admin/maint/XjoPqhzc228.bin is likely MALICIOUS!: 0.9999373555183411

17 http://whimar.com/wp-admin/maint/Verificerbarheden.mso is likely MALICIOUS!: 0.362288236618042

18 http://185.215.113.16/mine/random.exe is likely MALICIOUS!: 0.9999970197677612

19 https://wall5tghf6fdg.api.opensourcesaas.org/FcPJXgYD/mine.png is likely MALICIOUS!: 0.5353929996490479

20 http://87.120.112.102/roze.i586 is likely MALICIOUS!: 0.9999966621398926

21 http://103.72.57.120/TGIF/Jodozocw.dat is likely MALICIOUS!: 0.9996687173843384

22 https://www.semanariolacivilizacion.blogspot.com is likely BENINGN!: 0.24499544501304626

23 http://172.245.123.25/302/taskhostws.exe is likely MALICIOUS!: 0.7746655344963074

24 http://157.173.104.153/up/bb.ps1 is likely MALICIOUS!: 0.9997329711914062

25 http://107.170.34.159/morsec/Invoke-Shellcode.ps1 is likely MALICIOUS!: 0.99895179271698

26 http://157.173.104.153/up/Tool/ChromePass.exe is likely MALICIOUS!: 0.9998794794082642

27 http://101.99.94.195/mZlaoZbpEVWPJcG210.bin is likely MALICIOUS!: 0.9999423027038574

28 http://124.248.65.242:8899/sys/20230120_3.bin is likely MALICIOUS!: 0.9999881386756897

29 http://invictaindia.com/sty/iTSqHIazA174.bin is likely MALICIOUS!: 0.9993544816970825

30 http://invictaindia.com/sty1/Kajanlggenes.u32 is likely MALICIOUS!: 0.9999808669090271

31 http://8.138.96.41:10050/demon.x64.bin is likely MALICIOUS!: 0.9999973773956299

32 http://169.1.16.29/swift-bypass-breakpoints.exe is likely MALICIOUS!: 0.2990719676017761

33 https://www.mincultura.gov.co is likely BENINGN!: 0.16868330538272858

34 http://169.1.16.29/demon.x641.exe is likely MALICIOUS!: 0.9999975562095642

35 http://169.1.16.29/BidvestBank-Swift-DNS-Tunnel.exe is likely MALICIOUS!: 0.369070440530777

36 http://169.1.16.29/BidvestBank-Swift--DNS-evasion-encrypted-no-cloudflare.exe is likely BENINGN!: 0.17414702475070953

37 http://169.1.16.29/LOUD_EYE is likely MALICIOUS!: 0.9999887943267822

38 http://169.1.16.29/Swift-Beacon-Encrypted.exe is likely BENINGN!: 0.22295552492141724

39 http://178.215.238.13/r.sh is likely MALICIOUS!: 0.9999259114265442

40 http://91.218.67.59/wget.sh is likely MALICIOUS!: 0.8114745616912842

41 http://87.120.112.102/update.sh is likely MALICIOUS!: 0.9991742968559265

42 http://120.25.157.131/qz1.exe is likely MALICIOUS!: 0.9999975562095642

43 http://185.121.233.82/tt/mips64 is likely MALICIOUS!: 0.9999828338623047

44 https://www.gamebooks.org is likely BENINGN!: 0.07161882519721985

45 http://github.com/vizian123/msfvenomz/raw/main/reddit.exe is likely MALICIOUS!: 0.9517421722412109

46 https://pastebin.com/raw/FYu4F1YR is likely MALICIOUS!: 0.44059497117996216

47 http://120.25.157.131/fsx.exe is likely MALICIOUS!: 0.9999184012413025

48 https://www.ydray.com/get/t/u17290663674746gFwb38bd70be00c5oQ is likely MALICIOUS!: 0.9254165291786194

49 https://bitbucket.org/awgwrtwa/asss/downloads/1654-INICIO_DEMANDA_LABORAL_JUZGADO_CIVIL_DEL_CIRCUITO_DE_RAMA_JUDICIAL.CAB is likely MALICIOUS!: 0.2596791386604309

50 http://47.236.122.191/Geek.exe is likely MALICIOUS!: 0.9999968409538269

51 http://176.111.174.140/ywx.exe is likely MALICIOUS!: 0.9999595284461975

52 http://web.johnmccrea.com/downloads/67065227a0640_rrrrrrrr.exe is likely BENINGN!: 0.04001269489526749

**Analysis of the results:** These results illustrate very clearly the model's performance, which is mostly good, although there are a few cases that show room for improvement. 

[back](./)
