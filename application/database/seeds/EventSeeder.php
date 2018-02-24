<?php
class EventSeeder extends Seeder {
  private $table = 'ic_eventos';

  public function create_table() {

    $fields = [
      'id_evento'   => ['type' => 'int', 'constraint' => '11'],
      'id_usuario'  => ['type' => 'int'],
      'tipo'        => ['type' => 'int', 'constraint' => '11'],
      'fecha'       => ['type' => 'TIMESTAMP'],
      'descripcion' => ['type' => 'text'],
    ];

    $this->dbforge->add_field($fields);
    $this->dbforge->add_key('id_evento', true);
    $this->dbforge->create_table($this->table);
    var_dump('here we are');
  }

	public function run()	{
    $this->create_table();

		$this->db->truncate($this->table);
		$data = [
			'id_evento'   => null,
			'id_usuario'  => 1,
      'tipo'        => 1,
      'fecha'       => null,
			'descripcion' => 'una prueba',
    ];

		$this->insert($this->table, $data);
  }

  public function insert($table, $data) {
    if (!$this->db->insert($table, $data)) {
      var_dump($this->db->last_query());
    }
  }
}
