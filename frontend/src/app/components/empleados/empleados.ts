import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class Empleados implements OnInit {
  empleados: Empleado[] = [];
  empleado = new Empleado();
  cargando = false;
  guardando = false;
  editando = false;
  error = '';

  constructor(
    private readonly empleadoService: EmpleadoService,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.cargando = true;
    this.error = '';

    this.empleadoService.getEmpleados().subscribe({
      next: (empleados) => {
        this.empleados = empleados;
        this.cargando = false;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.error = 'No se pudieron cargar los empleados.';
        this.cargando = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  guardarEmpleado(): void {
    this.guardando = true;
    this.error = '';
    const request = this.editando
      ? this.empleadoService.putEmpleado(this.empleado)
      : this.empleadoService.postEmpleado(this.empleado);

    request.subscribe({
      next: () => {
        this.guardando = false;
        this.cancelarEdicion();
        this.cargarEmpleados();
      },
      error: () => {
        this.error = 'No se pudo guardar el empleado.';
        this.guardando = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  editarEmpleado(empleado: Empleado): void {
    this.empleado = new Empleado(
      empleado._id,
      empleado.name,
      empleado.position,
      empleado.office,
      empleado.salary,
    );
    this.editando = true;
    this.error = '';
  }

  eliminarEmpleado(id: string): void {
    this.empleadoService.deleteEmpleado(id).subscribe({
      next: () => this.cargarEmpleados(),
      error: () => {
        this.error = 'No se pudo eliminar el empleado.';
        this.changeDetector.markForCheck();
      },
    });
  }

  cancelarEdicion(): void {
    this.empleado = new Empleado();
    this.editando = false;
  }
}