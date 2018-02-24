package exceptions;

public class NonExistentObjectException extends Exception {

	private static final long serialVersionUID = 1L;

	public NonExistentObjectException(String errorMessage) {
		super("Data Exception: " + errorMessage);
	}
}

/*--- Formatted in Sun Java Convention Style on Mon, Oct 30, '00 ---*/

/*------ Formatted by Jindent 3.23 Gold 1.02 Trial --- http://www.jindent.de ------*/
