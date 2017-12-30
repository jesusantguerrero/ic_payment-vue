<?php 

class Comment_model extends CI_model
{
  
  function get_comments($id_averia){
    $comments = $this->db->where('id_averia',$id_averia)
                ->select('ic_reporte_averias.* , concat(ic_users.name," ",ic_users.lastname) as `empleado`',false)
                ->from('ic_reporte_averias')
                ->join('ic_users','ic_reporte_averias.id_empleado = ic_users.user_id','LEFT')
                ->get();

    if($comments){
      return $comments->result_array();
    }
    var_dump($this->db->last_query());
    return false;
  }

  function add_comment($comment)
  {
    if ($this->db->insert('ic_reporte_averias',$comment)) {
      return true;
    }
    return false;
  }

  function delete_comment($id_comment)
  {
    if ($this->db->delete('ic_reporte_averias',['id_reporte' => $id_comment])) {
      return true;
    }
    return false;
  }

  function update_comment($id_comment, $comment)
  {

  }
}