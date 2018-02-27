package exceptions;

public class ObjectAlreadyExistsException extends Exception {

	private static final long serialVersionUID = 1L;

	public ObjectAlreadyExistsException(String errorMessage) {
		super("Data Exception: " + errorMessage);
	}
}