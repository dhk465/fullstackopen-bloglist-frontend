const Notification = ({ message, isError = false }) => {
  if (!message) {
    return null;
  }

  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div data-testid="notification" style={style}>{message}</div>;
};

export default Notification;
