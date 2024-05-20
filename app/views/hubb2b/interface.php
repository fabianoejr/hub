<!DOCTYPE html>
<html lang="pt-br">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc.">

	<!-- App title -->
	<title>Hub</title>

	<?php echo link_tag('assets_novo/uplon/assets/css/bootstrap.min.css') ?>

	<!-- Switchery css -->
	<?php echo link_tag('assets_novo/uplon/assets/plugins/switchery/switchery.min.css') ?>
	<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
	<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

	<!-- Notification css (Toastr) -->
	<?php echo link_tag('assets_novo/uplon/assets/plugins/toastr/toastr.min.css') ?>

	<!-- datepicker -->
	<?php echo link_tag('assets_novo/uplon/assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css') ?>

	<?php echo link_tag('assets_novo/uplon/assets/plugins/jquery.filer/css/jquery.filer.css'); ?>

	<!-- App CSS -->
	<?php echo link_tag('assets_novo/uplon/assets/css/style.css') ?>

	<!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->

	<!-- AngularJs -->
	<script type="text/javascript" src="<?php echo base_url('assets_novo/uplon/assets/js/jquery.min.js') ?>"></script>
	<script type="text/javascript" src="<?php echo base_url('assets_novo/js/angular1-7.min.js') ?>"></script>
	<script type="text/javascript" src="<?php echo base_url('assets_novo/js/angular-route1-7.min.js') ?>"></script>
	<script type="text/javascript" src="<?php echo base_url('assets_novo/js/angular-sanitize1-7.min.js') ?>"></script>
	<script type="text/javascript" src="<?php echo base_url('assets_novo/js/dirPagination.js') ?>"></script>
	<script type="text/javascript" src="<?php echo base_url('assets_novo/js/masks.js') ?>"></script>
	<script type="text/javascript" src="<?php echo base_url('assets_novo/js/angular-locale_pt-br.js'); ?>"></script>

	<!-- select2 -->
	<?php echo link_tag('assets_novo/uplon/assets/plugins/multiselect/css/multi-select.css'); ?>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>

	<!-- call -->
	<?php echo put_headers(); ?>

	<!-- Modernizr js -->
	<script src="<?php echo base_url('assets_novo/uplon/assets/js/modernizr.min.js') ?>"></script>

	<style type="text/css">
		.wrapper {
			padding-top: 0px !important;
		}

		.wrapper .container {
			padding: 0;
		}

		.breadcrumb {
			padding: 0.5rem 1rem;
			font-size: 0.8em;
		}

		.loading {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 10000;
			background: rgba(245, 245, 245, 0.5);
		}

		.loading-img {
			max-width: 100px;
			max-height: 100px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -50px;
			margin-left: -50px;
		}
	</style>

</head>


<body <?php echo (isset($ngApp) && $ngApp != '') ? " ng-app=\"{$ngApp}\"" : "" ?>>

	<!-- loading -->
	<p class="loading" ng-show="loadingAll == true">
		<?php echo img(array('src' => 'assets/img/load_satc.gif', 'class' => 'loading-img')); ?>
	</p>

	<!-- ============================================================== -->
	<!-- Start right Content here -->
	<!-- ============================================================== -->

	<main role="main">
		<ng-view></ng-view>
	</main>

	<!-- Footer -->
	<footer class="footer text-right mt-5">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<?php echo date("Y") ?> | HUB B2B ©
				</div>
			</div>
		</div>
	</footer>
	<!-- End Footer -->

	<script>
		var resizefunc = [];
	</script>

	<!-- jQuery  -->
	<script src="<?php echo base_url('assets_novo/uplon/assets/js/tether.min.js') ?>"></script>
	<script src="<?php echo base_url('assets_novo/uplon/assets/js/bootstrap.min.js') ?>"></script>
	<script src="<?php echo base_url('assets_novo/uplon/assets/js/waves.js') ?>"></script>
	<script src="<?php echo base_url('assets_novo/uplon/assets/js/jquery.nicescroll.js') ?>"></script>
	<script src="<?php echo base_url('assets_novo/uplon/assets/plugins/switchery/switchery.min.js') ?>"></script>

	<!-- App js -->
	<script src="<?php echo base_url('assets_novo/uplon/assets/js/jquery.core.js') ?>"></script>
	<script src="<?php echo base_url('assets_novo/uplon/assets/js/jquery.app.js') ?>"></script>

	<!-- Toastr js -->
	<script src="<?php echo base_url('assets_novo/uplon/assets/plugins/toastr/toastr.min.js') ?>"></script>

	<!-- datepicker -->
	<script src="<?php echo base_url('assets_novo/uplon/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js') ?>"></script>

</body>

</html>