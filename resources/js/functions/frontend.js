$(function() {
  var formElement = $('.frontend');
  if(formElement.length) {

    formElement.find('form input, form textarea').on('blur', function(e) {
      var thisName = $(this).attr('name');
      var thisVal = $(this).val(); 
      if(thisVal){
        $(`.result-data span[class="${(thisName).toLowerCase()}"]`).text(`${thisVal}`);
      } 
    }); 

    formElement.find('form').form({
      fields: { 
        name: {
          identifier  : 'Name',
          rules: [
            {
              type   : 'empty',
            }
          ]
        },
        email: {
          identifier  : 'Email',
          rules: [
            {
              type   : 'email',
            }
          ]
        },
        phone: {
          identifier  : 'Phone', 
          rules: [
            {
              type   : 'minLength[14]',
            }
          ]
        },
        subject: {
          identifier  : 'Subject',
          rules: [
            {
              type   : 'empty',
            }
          ] 
        },
        message: {
          identifier  : 'Message',
          rules: [
            {
              type   : 'empty',
            }
          ]
        },
      }
    });

    formElement.find('form').on('submit', function(e) {
      e.preventDefault();
      var isValid = checkFields();
      if(isValid) {
        sessionStorage.setItem('contactData', formElement.find('form').serialize());
        alert('Dados salvos com sucesso!');
      }
    });

    function checkFields() {
      var errors = '';
      formElement.find('.ui.form .field.error').each(function() {
        var thisName = $(this).find('label').text();
        errors == '' ? errors = thisName : errors += `, ${thisName}`; 
      });   
      if(errors != '') {
        validateMessage(errors); 
        return false;
      } else {
        return true;
      }
    }
    
    function validateMessage(message) {
      swal({                    
        text: `Por favor, preencha o(s) seguinte(s) campo(s): ${message}`,
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#16ab39',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
  }
});