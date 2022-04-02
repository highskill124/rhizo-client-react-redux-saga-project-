import { useSelector } from 'react-redux';
import { IMenu } from '../dto/IMenu';
import { RootState } from '../state/RootReducer';

export const useMenus = () => {
    const menus: IMenu[] | undefined = useSelector<RootState, IMenu[]>((state) => state.menuState.data);
    return menus || [];
};
