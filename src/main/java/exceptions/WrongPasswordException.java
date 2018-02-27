package exceptions;

public class WrongPasswordException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public WrongPasswordException(String errorMessage) {
		super("Data Exception: " + errorMessage);
	}
}