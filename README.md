# Form-app

Hi everyone:3

This is my form app, that can translate netto to brutto using react without any libraries except of course 
those that was in the box with react-create-app. 

Representation

![image](https://user-images.githubusercontent.com/71015266/168644225-0cb4015f-06fb-4fce-9de4-30306b35ecdc.png)

Installation:

To install app, you need to do the following commands in the command prompt: 

```
git clone https://github.com/Ex-Machin/Form-app.git
```
```
cd Form-app/form-app
```
```
npm i
```
```
npm start
```

Description of the app:

Here in the main directory you can see different files but we need only 2 of them 

![image](https://user-images.githubusercontent.com/71015266/168646021-14b4a205-e2fa-433c-b77d-d065d52ee20e.png)

In App.css, you can see main styles for the whole app.

In App.js with the help of useState we can store data that
1. User types in the form
2. State of textArea to hide and show message of 

```
Text is required. You can’t enter more than {signsToTypy <= 0 ? 255 : signsToTypy} characters.
```
3. And server message where we sent data to 

To set custom validity and display error message on submit button, I used onInvalid event in react 

```
onInvalid={(e) => e.target.setCustomValidity("Please, input number")}
```
To handle submit action i used fetch where pass some request options where pointed out that we post data, and inserted information what kind of data this is.

For every input I added onInput event that changes our local state dynamically and if you needed to check it if it has errors. For example, if we passed not a number in the input for Netto we can get a message "Please, input number"

After submitting a form we change the state of succesMessage so we can change dynamically the whole page and display success box or got an error in console if server responds us with error.
