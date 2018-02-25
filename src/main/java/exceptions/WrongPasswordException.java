package exceptions;

public class WrongPasswordException extends RuntimeException{

    public WrongPasswordException(String error) {
		super("Exception Data: " + error);
	}
}