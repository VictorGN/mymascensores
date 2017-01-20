$( document ).ready(function() {

	actualizarconsulta();
	muelaModificacionFinal();
});

function actualizarconsulta(){

	$.ajax({
		type: "POST",
		url: "models/consultamuelas.php",
		data: {},
		success: function (datos) {
			$('#contUsuarios').html(datos);
		}
	});
}

function recargoajax()
{
	var Id_Paciente = document.getElementById("Id_Paciente").value;
	var noConsulta = document.getElementById("noConsulta").value;
	var diagnostico = document.getElementById("diagnostico").value;
	var fecha = document.getElementById("fecha").value;
	var noPiezaBucal= document.getElementById("noPiezaBucal").value;
	var obtratamiento= document.getElementById("obtratamiento").value;
	var valorTratamiento= document.getElementById("valorTratamiento").value;
	var observacion= document.getElementById("observacion").value;

	var parametros={Id_Paciente:Id_Paciente,
		noConsulta:noConsulta,
		diagnostico:diagnostico,
		fecha:fecha,
		noPiezaBucal:noPiezaBucal,
		obtratamiento:obtratamiento,
		valorTratamiento:valorTratamiento,
		observacion:observacion};

		$.ajax({
			type:"post",
			url:"models/ingresomuelas.php",
			data:parametros,
			success:function(datos)
			{

				msjExito('#mensaje','Agregado.');
				actualizarconsulta();
			}
		});

	}
	function eliminar(IdRegistroMuela)
	{
		p = confirm("�Estas seguro que desea eliminar?");

		if(p){

			$.ajax({
				type:"post",
				url:"models/eliminarMuela.php",
				data:{IdRegistroMuela:IdRegistroMuela},
				success:function(datos)
				{

					msjExito('#mensaje','Eliminado.');
					actualizarconsulta();
				}
			});
		}
	}
	function modificar(IdRegistroMuela)
	{
		$.ajax({
			type: "POST",
			url: 'models/consultaModificarMuela.php',
			data: {IdRegistroMuela:IdRegistroMuela},
			success: function (datos) {
				var oDato = JSON.parse(datos);
				$('#IdRegistroMuela').val(oDato.IdRegistroMuela)
				$('#fecha2').val(oDato.fecha);
				$('#noPiezaBucal2').val(oDato.noPiezaBucal);
				$('#obtratamiento2').val(oDato.obtratamiento);
				$('#valorTratamiento2').val(oDato.valorTratamiento);
				$('#observacion2').val(oDato.observacion);
			},

		});
	}

	/*MODIFICACION CON AJAX*/
	function muelaModificacionFinal()
	{
		$("#modificargestion").submit(function (event)
		{


			event.preventDefault();
			console.log("entre al submit");
			var parametros = $(this).serialize();
			$.ajax({
				type:"post",
				url:"models/modificarMuelas.php",
				data:parametros,
				context:this,
				success:function(respuesta)
				{
					console.log(respuesta);

				}
			});
		});
	}
