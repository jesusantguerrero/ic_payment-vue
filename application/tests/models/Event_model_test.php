<?php

class Event_model_test extends TestCase
{
  public static function setUpBeforeClass()	{
		parent::setUpBeforeClass();
    $CI =& get_instance();
    $CI->load->library('Seeder');
    $CI->seeder->call('EventSeeder');
  }

	public function setUp() {
    $this->model = $this->newModel('Event_model');
	}

	public function test_get_events()	{
    $expected = [
			'id_usuario'  => 1,
      'tipo'        => 'AGREGO',
			'descripcion' => 'una prueba',
    ];

    $list = $this->model->get()[0];
    $this->assertEquals($expected['id_usuario'], $list['id_usuario']);
    $this->assertEquals($expected['tipo'], $list['tipo']);
    $this->assertEquals($expected['descripcion'], $list['descripcion']);
  }

  public function test_add_event() {
    $event = [
			'id_usuario'  => 1,
      'tipo'        => 'ACTUALIZO',
			'descripcion' => 'prueba de agregar prueba',
    ];

    $this->model->add($event);
    $result = $this->model->get();
    $this->assertEquals($event['tipo'], $result[1]['tipo']);
  }

  public function test_free_space() {
    $result = $this->model->free_space(2);
    var_dump($result);
  }
}
