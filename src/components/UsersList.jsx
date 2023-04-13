import {fetchUsers} from '../store/thunks/fetchUsers.js';
import {addUser} from '../store/thunks/addUser.js';
import Button from './Button';
import Skeleton from './Skeleton.jsx';
import useThunk from '../hooks/use-thunk.jsx';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import UsersListItem from './UsersListItem.jsx';

const UsersList = () => {
	const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
	const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)
	const {data} = useSelector((state) => {
		return state.users;
	});

	useEffect(() => {
		doFetchUsers()
	}, [doFetchUsers]);

	const handleUserAdd = () => {
		doCreateUser()
	};

	const renderedUsers = data.map((user) => {
		return <UsersListItem key={user.id} user={user}/>
	});

	return (<>
		<div className='flex flex-row justify-between m-3 items-center'>
			<h1 className='m-2 text-xl'>Users</h1>
			<Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
		</div>
		{isLoadingUsers ? <Skeleton times={6} className='h-10 w-full'/> : renderedUsers}
	</>);
}

export default UsersList;
