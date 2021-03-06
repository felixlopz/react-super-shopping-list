import React, { useState, useEffect} from 'react'
import styled from 'styled-components';
import ReactLoading from 'react-loading';


import CustomCheckbox from './form/CustomCheckbox';
import { IconButton, Button } from './Buttons';

const Wrapper = styled.div`
	position:relative;
	overflow:hidden;
	display:flex;
	align-items:flex-start;
	height: 12.5rem;
	padding: 2.1em 3rem;
	&:not(:last-child){
		border-bottom: 2px solid var(--color-black-lg);
	}	

	@media ${props => props.theme.mediaQueries.desktop}{
		padding: 2rem 0;
	}
`
const ItemWrapper =  styled.div`
	width:100%;
	opacity: ${props => props.isItemDeleting ? 0.5 : 1};
	transition: opacity 0.3s ease-in;
`

const ItemName = styled.div`
	display:flex;
`
const ItemText = styled.h3`
	font-size: 2.4rem;
	font-weight: var(--bold);
	margin-left: 1.2rem;
	text-transform: capitalize;
	display:flex;
	flex-flow: column nowrap;
	line-height: 0.9;
	position: relative;

	&::before{
		content: '';
		position: absolute;
		top: 25%;
		left: -10px; right: -10px;
		height: 2px;
		background: var(--color-secondary);
		opacity: ${({checked}) => checked ? 1 : 0};
		transition: opacity 0.3s ease-in-out;
	}
	span{
		font-size: 1.8rem;
		margin-top: 0.5em;
		font-weight: var(--regular);
		color: var(--color-grey);
		text-transform:lowercase;
	}
`


const PriceList = styled.ul`
	display: flex;
	list-style: none;
	margin-top: 1em;
	
`

const PriceItem = styled.li`
	font-size: 1.8rem;
	color: var(--color-grey);
	&:not(:first-child){
		margin-left: 2rem;
	}
`

const PriceSpan = styled.span`
	margin-left: 0.5rem;
	color: ${props => props.color ? `var(--color-${props.color})` : `var(--color-light)` };
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
	z-index: 1;
	margin-right: .7rem;

	@media ${props => props.theme.mediaQueries.desktop}{
		display: none;
	}
`

const ButtonList = styled.ul`
	display: none;

	list-style: none;
	
	li{
		&:not(:last-child){
			margin-right: 2rem;
		}
	}

	@media ${props => props.theme.mediaQueries.desktop}{
		display: flex;
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
		opacity: ${props => props.isItemDeleting ? 1 : 0};
		transition: opacity 0.3s ease-in;		
	}
`

const Item = ({item, onToggleTodoDone, onRemoveItem, isOptionsOpen, openOptionsForItem}) => {
	const [checked, setChecked] = useState(false);
	const [isItemDeleting, setIsItemDeleting] = useState(false);

	useEffect(() =>{
		setChecked(item.done);	
	}, [item.done]);

	const round = (number, decimals) => {
	  return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
	}

  return (
		<Wrapper>
			<ItemWrapper isItemDeleting={isItemDeleting}>
				<ItemName>
					<CustomCheckbox checked={checked} onChange={() => { 
						setChecked(!checked); onToggleTodoDone(item._id)}}
					/>
					<ItemText checked={checked}
						onClick={() => { setChecked(!checked); onToggleTodoDone(item._id)}}
					>
						{item.name} 
						<span>x{item.quantity}</span>
					</ItemText>
				</ItemName>
				<PriceList>
					<PriceItem>
						price: 
						<PriceSpan>{item.price ? `${round(item.price, 2)}$` : `N/A`}</PriceSpan>
					</PriceItem>
					<PriceItem>
						total:
						<PriceSpan color="accent">
							{item.price ? `${round(item.price * item.quantity, 2)}$`: `N/A` }
						</PriceSpan>
					</PriceItem>
				</PriceList>
			</ItemWrapper>
			<OptionsWrapper open={isOptionsOpen}>
				<Button  color="primary" size="sm" spinner
					onClick = {() => { onRemoveItem(item._id)}}
				>
					Delete
				</Button>
				<Button  color="dark" size="sm"
					onClick = {() => {
						window.toggleItemModal('update', item);
						openOptionsForItem(null);
					}}
				>
					edit
				</Button>
			</OptionsWrapper>
      <OptionsButton>
      	{
					isOptionsOpen ?
			 		 <IconButton icon="times" onClick={() => openOptionsForItem(null)}/>
					:<IconButton icon="bars" 	onClick={() => openOptionsForItem(item._id)}/>
				}
			</OptionsButton>
			<ButtonList>
				<li>
					<IconButton icon="pencil-alt" bg="primary" size="lg" 
					  onClick={() => window.toggleItemModal('update', item)}
					/>
				</li>
				<li>
					<IconButton icon="trash" bg="black-lg" size="lg"
						onClick={ async () => {
							setIsItemDeleting(true);
							await onRemoveItem(item._id);
						}}
					/>
				</li>
			</ButtonList>
			<LoadingBox isItemDeleting={isItemDeleting}>
				<ReactLoading type="spin" color="white" height={60} width={60}/>
			</LoadingBox>
		</Wrapper>
  )
  
}


export default Item
  