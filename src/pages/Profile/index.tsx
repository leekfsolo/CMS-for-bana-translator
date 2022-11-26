import React from 'react';
import {IProfileSection, IProfile} from 'pages/interface';
import {Button} from '@mui/material';
import {useState} from 'react';
import {ICForm, ICFormSection} from 'components/interface';
import CForm from 'components/CForm';
import CButton from 'components/CButton';

const userData: IProfile = {
  username: 'username',
  password: '**********',
  fullname: 'Nguyen Van A',
  phone: '0911 011 011',
  accountRole: 'sub-admin'
};

const defaultValues: ICForm = {
  currPassword: '',
  newPassword: '',
  confirmNewPassword: ''
};

const Profile = () => {
  const {username, password, fullname, phone, accountRole}: IProfile = userData;
  const profileSections: IProfileSection[] = [
    {
      title: 'Profile',
      items: [
        {
          key: 'Fullname',
          value: fullname
        },
        {
          key: 'Phone',
          value: phone
        },
        {
          key: 'Account role',
          value: accountRole
        }
      ]
    },
    {
      title: 'Authentication',
      items: [
        {
          key: 'username',
          value: username
        },
        {
          key: 'password',
          value: password
        }
      ]
    }
  ];
  const changePasswordFormSections: ICFormSection[] = [
    {
      title: 'Change Password',
      items: [
        {
          label: 'Current Password',
          id: 'curr-password',
          name: 'currPassword',
          required: true,
          placeholder: 'Enter current password',
          type: 'password'
        },
        {
          label: 'New Password',
          id: 'new-password',
          name: 'newPassword',
          required: true,
          placeholder: 'Enter new password',
          type: 'password'
        },
        {
          label: 'Confirm New Password',
          id: 'confirm-new-password',
          name: 'confirmNewPassword',
          required: true,
          placeholder: 'Confirm new password',
          type: 'password'
        }
      ]
    }
  ];
  const [isChangePassword, setIsChangePassword] = useState(false);
  return (
    <div className='profile'>
      {profileSections.map((section) => (
        <div className='profile-section' key={section.title}>
          <div className='profile-section__title'>
            <h4>{section.title}</h4>
          </div>

          <div className='profile-section__infos'>
            {section.items.map((item, index) => {
              return (
                <div key={index} className='info-row'>
                  <div className='info-row__key'>
                    <p>{item.key}</p>
                  </div>

                  <div className='info-row__value'>
                    <p>{item.value}</p>
                  </div>

                  {item.key === 'password' && (
                    <div className='changePassword-button'>
                      <CButton
                        size='small'
                        variant='contained'
                        onClick={() => {
                          setIsChangePassword(!isChangePassword);
                        }}
                      >
                        change password
                      </CButton>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {isChangePassword && <CForm sections={changePasswordFormSections} defaultValues={defaultValues} />}
    </div>
  );
};

export default Profile;
