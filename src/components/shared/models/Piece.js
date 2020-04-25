/**
 * User model
 */
class Piece {
    constructor(props) {
        // console.log(props);
        this.id = null;
        this.text = props.stoneSymbol;
        this.score = props.value;
    }
}
export default Piece;
