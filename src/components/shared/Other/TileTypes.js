import User from "../models/User";

/**
 * 'Enums' for different tile types
 */
var TILE_TYPE = {
    DL : {text: "DOUBLE LETTER SCORE", color: 'deepskyblue'}, // Double Letter Tile
    TL : {text: "TRIPPLE LETTER SCORE", color: 'dodgerblue'},     // Tripple Letter Tile
    DW : {text: "DOUBLE WORD SCORE", color: 'salmon' },     // Double Word Tile
    TW : {text: "TRIPPLE WORD SCORE", color: 'red'},        // Tripple Word Tile
    NT : {text: "", color: 'rgba(77, 77, 77, 0.5)'},                        // Normal Tile
    ST : {text: "START", color: 'salmon'}                   // Start Tile
}

export default TILE_TYPE;

