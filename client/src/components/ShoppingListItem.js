import React , { useState, useEffect} from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

// Components
import { Button, IconButton} from  './Buttons';

const Wrapper = styled.div`
	position: relative;
	overflow: hidden;
	padding: 2rem 3rem; 
	display: flex;
	align-items: flex-start;
	&:not(:last-child){
		border-bottom: 2px solid var(--color-black-lg);
	}	

	@media ${props => props.theme.mediaQueries.desktop}{
		padding: 2rem 0;
		cursor: pointer;
	};
`

const ItemWrapper =  styled.div`
	width:100%;
	opacity: ${props => props.isListDeleting ? 0.5 : 1};
	transition: opacity 0.3s ease-in;
`

const ItemName = styled.p`
	cursor: pointer;
	display: block;
	font-size: 2.4rem;
	font-weight: var(--bold);
	text-transform:capitalize;
	display:flex;
	align-items:center;
	justify-content: space-between;
`
const ListProgress = styled.div`
	display: flex;
	align-items: center;
	/*margin: 1rem 0;*/
`

const ItemBar = styled.div`
	height: 8px;
	width: 14rem;
	border-radius: 8px;
	background: var(--color-black-lg);
	margin-left: 3rem;
	position: relative;

	&::after{
		content: '';
		position:absolute;
		top: 0;
		left: 0;
		height: 8px;
		border-radius: 8px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    width: ${props => `${props.percentage}%`};
	}

	&::before{
		content: ${props => `'${Math.trunc(props.percentage)}%'`};
		position: absolute;
		top: -2.2rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: 1.4rem;
		color: var(--color-grey);
	}
`
const ItemCount = styled.span`
	font-size:1.8rem;
	color:var(--color-primary);
`
const Budget = styled.span`
	font-size: 1.8rem;
	color: var(--color-grey);
	
	span {
		margin-left: 1rem;
		color: ${props => props.budget ? `var(--color-accent)` : `var(--color-light)`};
	}
`
const OptionsWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: var(--color-primary);
	transition: all .3s ease-in-out;
	opacity: ${props => props.open ? 1 : 0 };
	transform: ${props => props.open ? `translateY(0)` : `translateY(-100%)` };
	display:flex;
	justify-content: center;
	align-items: center;

	@media ${props => props.theme.mediaQueries.desktop}{
		display: none;
	}
`
const OptionsButton = styled.div `
	z-index:1;
	margin-right: .7rem;

	@media ${props => props.theme.mediaQueries.desktop}{
		display: none;
	}
`

const LoadingBox = styled.div`
	display: none;

	@media ${props => props.theme.mediaQueries.desktop}{
		pointer-events: none; 
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: ${props => props.isListDeleting ? 1 : 0};
		transition: opacity 0.3s ease-in;		
	}
`

const ShoppingListItem = ({onSelectShoppingList, shoppingList, onRemoveShoppingList, isLoading, openOptionsForList, isOptionsOpen, isListDeleting}) => {

	const itemsCount = shoppingList.items.length;
	const [completedItemsPercentage, setCompletedItemsPercentage] = useState(0);

	useEffect(() => {
		const totalItems = shoppingList.items.length;
		if (totalItems){
			const completedItems = shoppingList.items.filter((item) => item.done).length;
			const percentage = completedItems / totalItems * 100;
			setCompletedItemsPercentage (percentage);
		}
	},[shoppingList.items]);

  return (
   	<Wrapper >
      <ItemWrapper 
      	onClick={() => onSelectShoppingList(shoppingList)} 
      	isListDeleting = { isListDeleting === shoppingList._id }
      >
        <ItemName >{shoppingList.name}</ItemName>
        <ListProgress>
					<ItemCount>
						{ 
							itemsCount !== 1 ? (`${itemsCount} items`) : (`${itemsCount} item`) 
						} 
					</ItemCount>
					{itemsCount  ? <ItemBar percentage={completedItemsPercentage} /> : ''}
        </ListProgress>
        <Budget budget={shoppingList.budget}>
					budget: 
					<span>{
						shoppingList.budget ? `${shoppingList.budget}$` : 'not assigned'
					}
					</span>
				</Budget>
      </ItemWrapper>
			<OptionsWrapper open={isOptionsOpen}>
				<Button  color="primary" size="sm" spinner
					onClick={() => {
						if (isLoading)
							return
						onRemoveShoppingList(shoppingList._id);
						}}
				>
					Delete
				</Button>
				<Button  color="dark" size="sm"
				  onClick={() => {
				  	window.toggleShoppingListModal('update',shoppingList);
				  	openOptionsForList(null);
				  }}
				>
					edit
				</Button>
			</OptionsWrapper>
      <OptionsButton >
      	{
					isOptionsOpen ?
					 <IconButton icon="times" onClick={() => openOptionsForList(null)}/>
					:<IconButton icon="bars" 	onClick={() => openOptionsForList(shoppingList._id)}/>
				}
			</OptionsButton>
			<LoadingBox isListDeleting={isListDeleting === shoppingList._id}>
				<ReactLoading type="spin" color="white" height={60} width={60}/>
			</LoadingBox>
    </Wrapper>
  )
}

export default ShoppingListItem;