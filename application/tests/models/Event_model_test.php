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
    $list = $this->model->get();
    var_dump($list);
	}
}
