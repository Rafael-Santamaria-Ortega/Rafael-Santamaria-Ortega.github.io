---
layout: default
---

# Machine Learning Model for Spam Detectiom | Python, Security Automatiom

This project is one of the hands-on tasks from J.P. Morgan & Chase Co. `Cybersecurity Virtual Internship` program, and it's goal was to code and train a `Machine Learning` Algorithm to `detect if an email is likely a spam/phishing attack or legitimate mail`. The training data was the enron dataset, and the process was the following. 

### Step 0 

* Unzip the dataset

### Step 1 

* Parse and format the dataset in a way that the model could be trained on. This implied using a Pandas dataframe, however the code was already provided in the excersise. So, what I did was comment it:

```python
import pandas as pd   #Import the relevant libraries; i.e. pandas to handle data, and os to find the path to the data
import os

def read_spam():    # Defining a function to read the dataset spam data 
    category = 'spam'    # Define variable called 'category'
    directory = './enron1/spam'    # Define a variable called 'directory' with the location of the data
    return read_category(category, directory)    # Call the function read_category()

def read_ham():    # Defining a function to read the 'ham' or data labeled as not spam
    category = 'ham' # Define variable called 'ham'
    directory = './enron1/ham'    # Define variable called 'directory' with the location of the data to be read
    return read_category(category, directory)    # Call the function read_category()

def read_category(category, directory):    # Defining a function to read the labeled data
    emails = []    # Create empty list to store the email from training data
    for filename in os.listdir(directory):    # Loop through each email stored as a separate .txt file
        if not filename.endswith(".txt"):    # Ignore files that are not .txt
            continue
        with open(os.path.join(directory, filename), 'r') as fp:    # Open the location of each file as fp
            try:     # Error handling with try and except
                content = fp.read()    # Read each fp and store the data in the variable 'content'
                emails.append({'name': filename, 'content': content, 'category': category})    # Appedn the data to list as a dictionary with try entries 
            except:
                print(f'skipped {filename}')    # If error just skip the file
    return emails    # Return the list of emails

ham = read_ham()    # Define a variable to store all the data labeled as 'ham'
spam = read_spam()    # Define a variable to store all the data labeled as 'spam'

df_ham=pd.DataFrame.from_records(ham)    # Transform the 'ham' data into a panda dataframe so as to be able to train the model with clean data
df_spam=pd.DataFrame.from_records(spam)    # Transform the 'spam' data into a panda dataframe so as to be able to train the model with clean data
df=pd.concat([df_ham, df_spam], ignore_index=True)    # Use pandas.concat to join dataframes along an axis. In this case along the label axis
```

### Step 2 

* Now, the data had to be cleansed or preprocessed before passing it to the model. In ooder to do that I had to define a function that takes a string and replaces non alphabet characterss with a space, and also lowercases the result:

```python
import re    #Import the regular expressions library to handle any data 

def preprocessor(e):    # Define the preprocessor function 
    x=re.sub(r'[^a-zA-Z]',' ',e)    # Define a variable x that stores the result of calling the re.sub() function to substitute non alpha characters with spáces
    e_reg=x.lower()    # Call .lower() on the variable x to lowercase the string
    return e_reg    # retirn the string preprocessed
```

### Step 3

* This is the step where I had to train the `Machine learning` model, based on some hints in the code. The code I wrote is the following:

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# The CountVectorizer converts a text sample into a vector (think of it as an array of floats).
# Each entry in the vector corresponds to a single word and the value is the number of times the word appeared.
# Instantiate a CountVectorizer. Make sure to include the preprocessor you previously wrote in the constructor.
vectorizer=CountVectorizer(preprocessor=preprocessor,analyzer='word')
y=df['category'].map({'spam':1,'ham':0})

# Use train_test_split to split the dataset into a train dataset and a test dataset.
# The machine learning model learns from the train dataset.
# Then the trained model is tested on the test dataset to see if it actually learned anything.
# If it just memorized for example, then it would have a low accuracy on the test dataset and a high accuracy on the train dataset.
X_train,X_test,y_train,y_test=train_test_split(df['content'],y,test_size=0.2,train_size=0.8,shuffle=True,random_state=42)


# Use the vectorizer to transform the existing dataset into a form in which the model can learn from.
# Remember that simple machine learning models operate on numbers, which the CountVectorizer conveniently helped us do.
X_train_trans=vectorizer.fit_transform(X_train)
X_test_trans=vectorizer.transform(X_test)

# Use the LogisticRegression model to fit to the train dataset.
# You may remember y = mx + b and Linear Regression from high school. Here, we fitted a scatter plot to a line.
# Logistic Regression is another form of regression. 
# However, Logistic Regression helps us determine if a point should be in category A or B, which is a perfect fit.
l_r=LogisticRegression()
l_r.fit(X_train_trans,y_train)

# Validate that the model has learned something.
# Recall the model operates on vectors. First transform the test set using the vectorizer. 
# Then generate the predictions.
y_pred=l_r.predict(X_test_trans)

# We now want to see how we have done. We will be using three functions.
# `accuracy_score` tells us how well we have done. 
# 90% means that every 9 of 10 entries from the test dataset were predicted accurately.
# The `confusion_matrix` is a 2x2 matrix that gives us more insight.
# The top left shows us how many ham emails were predicted to be ham (that's good!).
# The bottom right shows us how many spam emails were predicted to be spam (that's good!).
# The other two quadrants tell us the misclassifications.
# Finally, the `classification_report` gives us detailed statistics which you may have seen in a statistics class.
print("Accuracy:",accuracy_score(y_test,y_pred))
print("CM: ",confusion_matrix(y_test,y_pred))
print(classification_report(y_test,y_pred))
```

* **The results were the following:**

```jupyter
Accuracy: 0.9748549323017408
CM:  [[717  12]
 [ 14 291]]
              precision    recall  f1-score   support

           0       0.98      0.98      0.98       729
           1       0.96      0.95      0.96       305

    accuracy                           0.97      1034
   macro avg       0.97      0.97      0.97      1034
weighted avg       0.97      0.97      0.97      1034
```

* Overall the model did grat, as underscored by all metrics

### Step 4 

* Finally, I was tasked with visualizing the features created by the verctorization, and to output the top 10 features of emails labeled in each category. The code I wrote was the following:

```python
# Let's see which features (aka columns) the vectorizer created. 
# They should be all the words that were contained in the training dataset.
features=vectorizer.get_feature_names_out()

# You may be wondering what a machine learning model is tangibly. It is just a collection of numbers. 
# You can access these numbers known as "coefficients" from the coef_ property of the model
# We will be looking at coef_[0] which represents the importance of each feature.
# What does importance mean in this context?
# Some words are more important than others for the model.
# It's nothing personal, just that spam emails tend to contain some words more frequently.
# This indicates to the model that having that word would make a new email more likely to be spam.
coef=l_r.coef_[0]
features_df=pd.DataFrame({'Feature':features,'Coef':coef})

# Iterate over importance and find the top 10 positive features with the largest magnitude.
# Similarly, find the top 10 negative features with the largest magnitude.
# Positive features correspond to spam. Negative features correspond to ham.
# You will see that `http` is the strongest feature that corresponds to spam emails. 
# It makes sense. Spam emails often want you to click on a link.
sorted_coef=features_df.sort_values(by='Coef',ascending=False)
top_10_spam=sorted_coef.head(10)
top_10_ham=sorted_coef.tail(10)
print('Spam:\n',top_10_spam,'\n')
print('Ham:\n',top_10_ham)
```

* **The results were the following:**

```jupyter
Spam:
         Feature      Coef
24309        no  0.920089
17180      http  0.853581
27576    prices  0.851243
29417    remove  0.760439
16446     hello  0.736283
25120      only  0.711263
29418   removed  0.677409
16506      here  0.663679
23302      more  0.625946
25757  paliourg  0.622317 

Ham:
         Feature      Coef
17096       hpl -1.043461
24004      neon -1.152822
9328       deal -1.154972
38503       xls -1.227058
26651  pictures -1.292209
9141      daren -1.295490
10653       doc -1.325974
2474   attached -1.368536
34478    thanks -1.459408
12156     enron -1.493970
```

That concluded the hands-on task. 

[Back](./)
