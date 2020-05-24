import User from "../models/User"/**
 * 'Enums' for different tile types
 */
var TILES = {
    DL : {text: "2x Letter", color: 'deepskyblue'}, // Double Letter Tile
    TL : {text: "3x Letter", color: 'dodgerblue'},     // Tripple Letter Tile
    DW : {text: "2x Word", color: 'salmon' },     // Double Word Tile
    TW : {text: "3x Word", color: 'red'},        // Tripple Word Tile
    NT : {text: "", color: 'rgba(77, 77, 77, 0.5)'},                        // Normal Tile
    ST : {text: "START", color: 'salmon'}                   // Start Tile
}

export default TILES;

