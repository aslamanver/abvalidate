## Custom Message - jQuery Form Validation - abValidate.js

 * Contribution are welcome - Give a pull request <br>
 * Don't give default error messages to your clients give in their language which they understand !
 * https://aslamanver.github.io/abvalidate/ - Example

#### 1. Copy the CDN after your good scripts 

```html

<!-- If you have already jQuery script, then do not add this line -->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!-- abValidate Library -->
<script type="text/javascript" src="https://raw.githubusercontent.com/aslamanver/abvalidate/master/abValidate.min.js">
<link rel="stylesheet" href="https://raw.githubusercontent.com/aslamanver/abvalidate/master/abValidate.css">
```

#### 2. How it works

1. Initialize the library

```javascript
$(document).ready(function () {
    //.ab-form is your form class
    $(".ab-form").abValidate();
});
```

2. That's all, now write all of your code in your HTML

```html
<form class="ab-form" action="your_action_url">
   
   <!-- Input and error message should be in a div class -->
   <div class="my-form-group">
        <input type="text" name="name" ab-validation="required,min:5" class="ab-validation-i" />
        <div class="error"></div>
    </div><br>

    <div class="my-form-group">
        <input type="submit" name="submit" value="Submit">
    </div>

</form>
```

* Add ```.ab-validation-i``` class to your inputs which should be validated and write your validations in ```ab-validation```

```html
<input type="text" name="name" ab-validation="required,min:5" class="ab-validation-i" />
```

* Examples

```html
<input type="text" name="name" ab-validation="required|Hey dude you missed that,min:5| No no you want to type more" class="ab-validation-i" />
```

#### 3. Wanna write more ?

```javascript
$(".ab-form").abValidate({
    color: "#556b2f",
    backgroundColor: "white",
    debug: true
});
```

Return the form status
```javascript
$(".ab-form").abValidate().success;
```

