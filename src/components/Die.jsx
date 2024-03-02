function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div>
      <h2 className="box" style={styles} onClick={props.holdDice}>
        {props.value}
      </h2>
    </div>
  );
}
export default Die;
