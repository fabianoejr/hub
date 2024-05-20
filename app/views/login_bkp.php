<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Login</title>
</head>

<body>
	<h2>Login</h2>
	<?php echo validation_errors(); ?>
	<?php echo form_open('login'); ?>

	<label for="cnpj">CNPJ</label>
	<input type="text" name="cnpj" /><br />

	<label for="senha">Senha</label>
	<input type="senha" name="senha" /><br />

	<input type="submit" name="submit" value="Login" />

	</form>
	<?php if (isset($error)) echo $error; ?>
</body>

</html>
