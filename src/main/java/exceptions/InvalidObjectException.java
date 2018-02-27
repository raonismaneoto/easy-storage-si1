package exceptions;

public class InvalidObjectException extends Exception {

	private static final long serialVersionUID = 1L;

	public InvalidObjectException(String errorMessage) {
		super("Data Exception: " + errorMessage);
	}
}