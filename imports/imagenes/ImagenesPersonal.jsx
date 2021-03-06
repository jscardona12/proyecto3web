import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ImageForm from './ImageForm';
import Buscador from './Buscador';
import ImagePreview from './ImagePreview';

export default class ImagenesPersonal extends TrackerReact(Component){

	constructor() {
		super();
		this.state=
		{
			filters:{},
			count:20,
			query:"",
			subscription:{
				imagenes:Meteor.subscribe("myImages",{},{sort:{votos:-1},limit: 20})
			}
		}

	}

	componentWillUnmount() {
		this.state.subscription.imagenes.stop();
	}

	imagenes()
	{
		return Imagenes.find({},{sort: {votos:-1},limit: this.state.cant}).fetch();
	}

	addSearch(event)
	{
		if(!Meteor.userId())
			{
			Bert.alert( 'Por favor inicie sesión para ver sus imágenes', 'danger', 'fixed-top', 'fa-frown-o' );
			Session.set("Meteor.loginButtons.dropdownVisible", true);
			}
		else
		{
		event.preventDefault();
		var bus=this.refs.filtroImagenes.value.trim();
		var cant=parseInt(this.refs.numeroImagenes.value);
		this.setState({count:cant})
	    this.setState({query:bus});
	    this.state.subscription.imagenes.stop();
	    this.setState({subscription:{
	    		imagenes:Meteor.subscribe("myImages",bus,{sort:{votos:-1}})
	    	}});

	}
	}


	render()
	{
		return(
		<div>
		<h3> Mis imágenes</h3>

			<form className="Buscador" id="FormBuscar"onSubmit={this.addSearch.bind(this)}>
			<input type="text"
				   ref="filtroImagenes"
				   placeholder="Palabra clave a buscar"/>
			<input type="number"
				   ref="numeroImagenes"
				   min="1"
				   max="100"
				   required="required"
				   id="numeroImagenes"
				   value={this.state.cant}
				   />
			<button type="submit"  value="Submit">Buscar</button>
			</form>

		{this.imagenes().map((imagen)=>{
			return <ImagePreview key={imagen._id} imagen={imagen}  />})}
		</div>


			)

	}
}
