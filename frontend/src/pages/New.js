import React, { Component } from "react";
import api from "../services/api";
import "./New.css";

class New extends Component {
	state = {
		image: null,
		author: '',
		place: '',
		description: '',
		hashtags: ''
	};

	handleSubmit = async e => {
		e.preventDefault();

		const data = new FormData();

		data.append("image", this.state.image);
		data.append("author", this.state.author);
		data.append("place", this.state.place);
		data.append("description", this.state.description);
		data.append("hashtags", this.state.hashtags);

		await api.post("posts", data);

		this.props.history.push("/");
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleImageChange = e => {
		this.setState({ image: e.target.files[0] });
	};

	render() {
		return (
			<form id="new-post">
				<input
					onChange={this.handleImageChange}
					type="file" />

				<input type="text"
					name="author"
					onChange={this.handleChange}
					placeholder="Autor do Post" />

				<input type="text"
					name="place"
					onChange={this.handleChange}
					placeholder="Local do Post" />

				<input type="text"
					name="description"
					onChange={this.handleChange}
					placeholder="Descrição do post" />

				<input type="text"
					name="hashtags"
					onChange={this.handleChange}
					placeholder="Hashtags" />

				<button type="submit" onClick={this.handleSubmit} >Enviar</button>

			</form>
		);
	}
}

export default New;