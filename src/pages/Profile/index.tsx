import React from 'react';
import {IProfileSection} from 'pages/interface';
import {useState} from 'react';
import {ICForm, ICFormSection} from 'components/interface';
import CForm from 'components/CForm';
import CButton from 'components/CButton';
import {useAppSelector} from 'app/hooks';
import {authSelector} from 'app/selectors';

const defaultValues: ICForm = {
  currPassword: '',
  newPassword: '',
  confirmNewPassword: ''
};

const Profile = () => {
  const auth = useAppSelector(authSelector);
  const {userInfo} = auth;

  const profileSections: IProfileSection[] = [
    {
      title: 'Hồ sơ',
      items: [
        {
          key: 'Họ và tên',
          value: userInfo?.fullname || ''
        },
        {
          key: 'Số điện thoại',
          value: userInfo?.phone || ''
        },
        {
          key: 'Vai trò',
          value: userInfo?.accountRole || ''
        }
      ]
    },
    {
      title: 'Tài khoản',
      items: [
        {
          key: 'Tên tài khoản',
          value: userInfo?.username || ''
        },
        {
          key: 'Mật khẩu',
          value: '*'.repeat(8)
        }
      ]
    }
  ];
  const changePasswordFormSections: ICFormSection[] = [
    {
      title: 'Đổi mật khẩu',
      items: [
        {
          label: 'Mật khẩu hiện tại',
          id: 'curr-password',
          name: 'currPassword',
          required: true,
          placeholder: 'Hãy điền mật khẩu hiện tại',
          type: 'password'
        },
        {
          label: 'Mật khẩu mới',
          id: 'new-password',
          name: 'newPassword',
          required: true,
          placeholder: 'Hãy điền mật khẩu mới',
          type: 'password'
        },
        {
          label: 'Xác nhận mật khẩu',
          id: 'confirm-new-password',
          name: 'confirmNewPassword',
          required: true,
          placeholder: 'Xác nhận mật khẩu',
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

                  {item.key === 'Mật khẩu' && (
                    <div className='changePassword-button'>
                      <CButton
                        size='small'
                        variant='contained'
                        onClick={() => {
                          setIsChangePassword(!isChangePassword);
                        }}
                      >
                        Đổi mật khẩu
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
