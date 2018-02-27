package exceptions;

public class NonExistentObjectException extends Exception {

	private static final long serialVersionUID = 1L;

	public NonExistentObjectException(String errorMessage) {
		super("Data Exception: " + errorMessage);
	}
}