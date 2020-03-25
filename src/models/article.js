export default class Article{
	constructor(id, title, content, isPrivate, releaseDate){
		this.id          = id;
		this.title       = title;
		this.content     = content;
		this.isPrivate   = isPrivate;
		this.releaseDate = releaseDate;
	}
}