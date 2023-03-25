import {useAppDispatch} from 'app/hooks';
import {refreshToken} from 'pages/Auth/authSlice';

export default function useRefreshToken() {
  const dispatch = useAppDispatch();
  const refresh = async () => {
    const res: any = await dispatch(refreshToken());

    return res;
  };
  return refresh;
}
