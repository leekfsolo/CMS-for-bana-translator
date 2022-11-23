import React from 'react';
import {Box, Button, FormHelperText} from '@mui/material';
import {Controller, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {FormGroup} from '@mui/material';
import CInput from 'components/CInput';
import CSelect from 'components/CSelect/CSelect';
import {ICForm, ICFormInput, ICFormSection} from 'components/interface';

type Props = {
  sections: ICFormSection[];
  defaultValues: ICForm;
};

const CForm = (props: Props) => {
  const {sections, defaultValues} = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
    getValues
  } = useForm<ICForm>({defaultValues});

  const onValidSubmit: SubmitHandler<ICForm> = (data) => {
    // test
    console.log(data);
    reset(defaultValues);
  };

  const onInvalidSubmit: SubmitErrorHandler<ICForm> = (data, event) => {
    event?.target.classList.add('wasvalidated');
  };

  const rulesValidation = (item: ICFormInput) => {
    let validator = {required: {value: item.required, message: 'This field is required'}};
    if (item.name === 'phone') {
      Object.assign(validator, {pattern: {value: /\d{10}/, message: 'Invalid phone number'}});
    }
    if (item.name === 'accountRole') {
      Object.assign(validator, {validate: (value: string) => value !== 'default' || 'This field is required'});
    }
    if (item.name === 'confirmPassword') {
      Object.assign(validator, {
        validate: (value: string) => value === getValues('password') || 'Password does not match'
      });
    }

    return validator;
  };

  return (
    <form onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)} method='POST' action='#' noValidate>
      {sections.map((section) => (
        <div className='cform-section' key={section.title}>
          <div className='cform-section__title'>
            <h4>{section.title}</h4>
          </div>

          <FormGroup className='cform-section__inputs'>
            {section.items.map((item) => {
              return (
                <div key={item.id} className='input-row w-100'>
                  <div className='input-row__label'>
                    <label htmlFor={item.id}>
                      {item.label}
                      {item.required && <span className='required'>*</span>}
                    </label>
                  </div>
                  <div className='input-row__field'>
                    <Box sx={{position: 'relative'}}>
                      <Controller
                        control={control}
                        name={item.name}
                        rules={rulesValidation(item)}
                        render={({field}) => (
                          <>
                            {item.options ? (
                              <CSelect
                                {...field}
                                id={item.id}
                                placeholder={item.placeholder}
                                options={item.options}
                                valid={!errors[item.name]}
                              />
                            ) : (
                              <CInput
                                {...field}
                                id={item.id}
                                placeholder={item.placeholder}
                                type={item.type}
                                valid={!errors[item.name]}
                              />
                            )}
                          </>
                        )}
                      />
                      {errors[item.name] && (
                        <FormHelperText className='form-helper-text'>{errors[item.name]?.message}</FormHelperText>
                      )}
                    </Box>
                  </div>
                </div>
              );
            })}
          </FormGroup>
        </div>
      ))}

      <div className='cform-button'>
        <Button type='submit' variant='outlined'>
          Create
        </Button>
      </div>
    </form>
  );
};

export default CForm;
