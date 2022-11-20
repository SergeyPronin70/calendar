import { AppDispatch} from "../../index"
import { IUser } from "../../../models/user"
import { AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types"
import UserService from "../../../api/UserService"


export const AuthActionCreator = {
    setUser: (user: IUser): SetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
    setIsAuth: (isAuth: boolean): SetAuthAction => ({ type: AuthActionsEnum.SET_AUTH, payload: isAuth }),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({ type: AuthActionsEnum.SET_IS_LOADING, payload: isLoading }),
    setError: (message: string): SetErrorAction => ({ type: AuthActionsEnum.SET_ERROR, payload: message }),
    login: (username: string, password: string) => async (dispatch: 
        //ThunkDispatch<RootState, undefined, AnyAction>
        AppDispatch
        ) => {
        try {
            dispatch(AuthActionCreator.setIsAuth(true));
            setTimeout( async () => {

                const response = await UserService.getUsers();
                const mockUser = response.data.find(user => user.username === username && user.password === password);
                if (mockUser) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUser.username);
                    dispatch(AuthActionCreator.setUser(mockUser));
                    dispatch(AuthActionCreator.setIsAuth(true));
                    
                } else {
                    dispatch(AuthActionCreator.setError('Некорректный логин или пароль'));
                }
                dispatch(AuthActionCreator.setIsLoading(false));
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreator.setError('Произошла ошибка при логине'));
        }
    },
    logout: () => async (dispatch: AppDispatch): Promise<void> => {
        try {
            localStorage.removeItem('auth');
            localStorage.removeItem('username');
            dispatch(AuthActionCreator.setUser({} as IUser));
            dispatch(AuthActionCreator.setIsAuth(false));
        } catch (e) {
            dispatch(AuthActionCreator.setError('Произошла ошибка при логауте'))
        }
    }
}