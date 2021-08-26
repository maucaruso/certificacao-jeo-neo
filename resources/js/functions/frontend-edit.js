$(function() {
  var formElement = $('.frontend-edit');
  if(formElement.length) {

    function restoreData() {
      var contactData = decodeURI(sessionStorage.getItem('contactData')).replace('%40', '@');

      if(contactData){
        contactData.split('&').map((item) => {
          var name = item.split('=')[0];
          var value = item.split('=')[1];
          $(`.ui.form [name="${name}"]`).val(value);
          $(`.result-data span[class="${(name).toLowerCase()}"]`).text(`${value}`);
        }); 
      }
    }

    restoreData();

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
  
    formElement.on('submit', function(e) {
      e.preventDefault();
      var isValid = checkFields();
      if(isValid) {
        sessionStorage.setItem('contactData', formElement.find('form').serialize());
        restoreData();
        alert('Dados alterados com sucesso!');
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