/**
 * WordPress dependencies
 */

import { Toolbar } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function isListRootSelected( editor ) {
	return (
		! editor.selection ||
		editor.selection.getNode().closest( 'ol,ul' ) === editor.getBody()
	);
}

function isActiveListType( editor, tagName, rootTagName ) {
	if ( document.activeElement !== editor.getBody() ) {
		return tagName === rootTagName;
	}

	const listItem = editor.selection.getNode();
	const list = listItem.closest( 'ol,ul' );

	if ( ! list ) {
		return;
	}

	return list.nodeName.toLowerCase() === tagName;
}

export const ListToolbar = ( { editor, onTagNameChange, tagName } ) => (
	<Toolbar
		controls={ [
			{
				icon: 'editor-ul',
				title: __( 'Convert to unordered list' ),
				isActive: isActiveListType( editor, 'ul', tagName ),
				onClick() {
					if ( isListRootSelected( editor ) ) {
						onTagNameChange( 'ul' );
					} else {
						editor.execCommand( 'InsertUnorderedList' );
					}
				},
			},
			{
				icon: 'editor-ol',
				title: __( 'Convert to ordered list' ),
				isActive: isActiveListType( editor, 'ol', tagName ),
				onClick() {
					if ( isListRootSelected( editor ) ) {
						onTagNameChange( 'ol' );
					} else {
						editor.execCommand( 'InsertOrderedList' );
					}
				},
			},
			{
				icon: 'editor-outdent',
				title: __( 'Outdent list item' ),
				onClick: () => editor.execCommand( 'Outdent' ),
			},
			{
				icon: 'editor-indent',
				title: __( 'Indent list item' ),
				onClick: () => editor.execCommand( 'Indent' ),
			},
		] }
	/>
);
