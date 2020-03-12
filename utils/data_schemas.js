import * as types from './data_types'

const SCHEMAS = [
    /*
     * label
     * field
     * type
     * suggest
     * options
     */
    {
        label: 'Media Gallery',
        field: 'medias',
        type: types.MEDIA,
        suggest: [],
        options: {
            placeholder: "Media Gallery",
            multiple: true
        }
    },
    {
        label: 'Title',
        field: 'title',
        type: types.TEXT,
        suggest: [],
        options: {
            helpText: "Title",
            placeholder: "Title"
        }
    },
    {
        label: 'Description',
        field: 'description',
        type: types.TEXT,
        suggest: [],
        options: {
            placeholder: "Description"
        }
    },
    {
        label: 'Parent Destination',
        field: 'parent_destination',
        type: types.DATA,
        suggest: [],
        options: {
            placeholder: "Parent",
            icon: "crop-square",
            labelField: "title",
            module: "destination",
            valueField: "id",
            multiple: false
        }
    },
    {
        label: 'Address',
        field: 'address',
        type: types.MAP,
        suggest: [],
        options: {
            placeholder: "Address"
        }
    },
    {
        label: 'Contact',
        field: 'contact',
        type: types.JSON,
        suggest: [],
        options: {
            placeholder: "Contact"
        }
    },
    {
        label: 'Flags',
        field: 'flags',
        type: types.DATA,
        suggest: [],
        options: {
            placeholder: "Flags",
            icon: "flag",
            labelField: "title",
            valueField: "value",
            multiple: true
        }
    },
    {
        label: 'Taxonomies',
        field: 'taxonomies',
        type: types.DATA,
        suggest: [],
        options: {
            placeholder: "Taxonomies",
            labelField: "title",
            valueField: "id",
            multiple: true,
            module: "taxonomy",
            allowNew: true
        }
    },
    {
        label: 'Level',
        field: 'level',
        type: types.TEXT,
        suggest: [],
        options: {
            placeholder: "Level"
        }
    }
];

const TABLES = {
    destination: {
        fields: ['medias', 'title', 'description', 'destination', 'parent_destination', 'address', 'taxonomies', 'level', 'flags', 'contact']
    }
}

export default function getSchema(label) {
    return SCHEMAS.filter(x => TABLES[label].fields.includes(x.field))
}
