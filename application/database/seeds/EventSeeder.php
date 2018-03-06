<?php
class EventSeeder extends Seeder {
  private $table = 'ic_eventos';

  public function create_table() {
    $types = ['AGREGO', 'ACTUALIZO', 'REGISTRO', 'ELIMINO', 'CANCELO', 'SUSPENDIO','EXTENDIO'];
    $fields = [
      'id_evento'   => ['type' => 'int', 'constraint' => '11', 'unsigned' => true, 'auto_increment' => true],
      'id_usuario'  => ['type' => 'int'],
      'tipo'        => ['type' => 'enum', 'constraint' => $types],
      'fecha'       => ['type' => 'TIMESTAMP'],
      'descripcion' => ['type' => 'text'],
      'enlace'      => ['type' => 'text']
    ];

    $this->dbforge->drop_table($this->table, true);
    $this->dbforge->add_field($fields);
    $this->dbforge->add_key('id_evento', true);
    $this->dbforge->create_table($this->table, true);
  }

	public function run()	{
    $this->create_table();

		$data = [
			'id_usuario'  => 1,
      'tipo'        => 1,
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
