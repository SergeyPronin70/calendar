import { Layout, Menu, MenuProps, Row } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../router';
import { AuthActionCreator } from '../store/reducers/auth/action-creator';

const Navbar: React.FC = () => {
    let navigate = useNavigate();
    const {logout} = useAction();
    const {isAuth, user} = useTypedSelector(state => state.auth)

    const menuItems: MenuProps['items'] = ['Login',].map(key => ({
        key,
        label: key,
        onClick: () => navigate(RouteNames.LOGIN),
    }));
    const menuItemsLogout: MenuProps['items'] = ['Logout',].map(key => ({
        key,
        label: key,
        onClick: () => logout(),
    }));

    return (
        <Layout.Header >
            <Row justify='end'>
                {
                    isAuth
                        ?
                        <>
                        <div style={{color: 'white'}}>{user.username}</div>
                        <Menu theme='dark' mode='horizontal' disabledOverflow={true} selectable={false}
                            items={menuItemsLogout} />
                        </>
                        
                        :
                        <Menu theme='dark' mode='horizontal' disabledOverflow={true} selectable={false}
                            items={menuItems} />
                }
            </Row>
        </Layout.Header>
    )
}

export default Navbar;