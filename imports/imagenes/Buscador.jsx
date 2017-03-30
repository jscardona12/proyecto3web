
//Juan Sebastian Cardona: la carpeta que tiene los archivos de JSX de la interfaz no deberia llamrse imagenes, deberia llamarse UI.
//Este diseño de carpeta lo tiene meteor en su pagina web y es un criterio de calificacion
import React,{Component} from 'react';

export default class Buscador extends Component{

	addSearch(event)
	{
		event.preventDefault();
		var bus=this.refs.filtroImagenes.value.trim()

		var title = {};
		var snippet = {};
	    snippet['snippet'] = new RegExp('.*' + image);
	    title['title'] = new RegExp('.*' + image);
	    var filtro = { '$or': [snippet, title] };

		Meteor.call('changeSearch',bus,()=>{
			this.refs.filtroImagenes.value="";
		});
	}

	render()
	{
		return(

			<form className="Buscador" id="FormBuscar"onSubmit={this.addSearch.bind(this)}>
			<input type="text" 
				   ref="filtroImagenes"
				   placeholder="Palabra clave a buscar"/>
			<button type="submit"  value="Submit">Buscar</button>
			</form>

			)
	}
}
