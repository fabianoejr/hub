<?php
echo link_tag('assets_novo/uplon/assets/css/bootstrap.min.css');
echo link_tag('assets/css/jotastyle.css');
echo link_tag('assets/css/jota_componentes.css');
echo link_tag('assets/css/j_color_1.css');
echo link_tag('assets/css/j_color_2.css');
echo link_tag('assets/css/fonts.css');
?>

<style>
	.img-cover {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: right;
	}
</style>

<main class="form-signin">
	<div id="root">
		<div class="d-flex flex-column flex-root">
			<div class="d-flex flex-column flex-lg-row flex-column-fluid" id="kt_login">
				<div class="d-flex flex-column flex-lg-row-auto bg-verde_01 w-lg-800px pt-15 pt-lg-0 bg_login_top">
					<img src=" <?php echo base_url('assets/img/4.jpg') ?>" class="img-cover">
				</div>

				<div class="login-content flex-lg-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden py-20 px-10 p-lg-7 mx-auto mw-550px w-100">
					<div class="d-flex flex-column-fluid flex-center py-10">
						<?php echo form_open('login', ["class" => "text-left form w-100"]); ?>
						<div class="pb-lg-10">
							<h3 class="fw-bolder text-dark display-6">HUB B2B</h3>
							<div class="text-muted fw-bold fs-3">Faça o login abaixo</div>
						</div>
						<div class="form-floating mb-3">
							<input type="text" class="form-control" name="cnpj" value="CNPJ" onclick="this.value=''" placeholder="CNPJ">
							<label for="cnpj">CNPJ</label>
						</div>
						<div class="form-floating mb-3">
							<input type="password" class="form-control" name="senha" value="123" onclick="this.value=''" placeholder="Senha">
							<label for="password">Senha</label>
						</div>
						<button class="w-100 btn btn-lg btn-primary mb-2" type="submit">Login</button>
						<div>
							<?php echo validation_errors('<div class="alert alert-danger">', '</div>'); ?>
							<?php if (isset($error)) {
								echo "<div class='alert alert-danger'>$error</div>";
							} ?>
						</div>
						</form>
					</div>
					<div class="d-flex flex-column-fluid flex-center py-10">
						<span class="text-muted fw-bolder fs-4 cursor-pointer">&copy; SATC</span>
					</div>
				</div><!-- :::: Final do "login-content" :::: -->

			</div> <!-- :::: Final do "d-flex flex-column flex-lg-row flex-column-fluid" :::: -->
		</div> <!-- :::: Final do "d-flex flex-column flex-root" :::: -->
	</div> <!-- :::: Final do "root" :::: -->
</main> <!-- :::: Final do "main" :::: -->