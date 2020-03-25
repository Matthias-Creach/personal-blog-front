export default class Folder{
	constructor(name, path, parent, children){
		this.name        = name;
		this.path        = path;
		this.parent = parent;
		this.children    = children;
	}
}