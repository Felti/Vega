// File related
const documentsExtensions = ['docx', 'doc', 'xls', 'xlsx', 'ppt', 'pptx', 'pages', 'ai', 'psd', 'txt', 'pdf', 'e'];
const imagesExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
const videoExtensions = ['flv', 'avi', 'mov', 'mp4', 'mkv', 'wmv'];
const userFileExtensions = ['csv'];

const emailRegExp =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userLosingChangesPrevention =
	'Êtes-vous sûr de vouloir quitter la page sans enregistrer? Si vous cliquez sur oui, tous vos changements seront perdus !';
const added = 'ajouté';
const edited = 'modifié';
const deletedPermanently = 'supprimé définitivement';
const softDeleted = 'archivé';
const restored = 'restoré';
const approved = 'approuvé';

const addedF = 'ajoutée';
const editedF = 'modifiée';
const deletedPermanentlyF = 'supprimée définitivement';
const softDeletedF = 'archivée';
const restoredF = 'restorée';
const approvedF = 'approuvée';

export {
	documentsExtensions,
	imagesExtensions,
	videoExtensions,
	userFileExtensions,
	userLosingChangesPrevention,
	emailRegExp,
	added,
	edited,
	deletedPermanently,
	softDeleted,
	restored,
	addedF,
	editedF,
	deletedPermanentlyF,
	softDeletedF,
	restoredF,
	approved,
	approvedF,
};
