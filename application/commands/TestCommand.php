<?php

class TestCommand extends Command
{
    public function __invoke()
    {
        $this->stdio->outln('<<green>>This is TestCommand class<<reset>>');
    }
}
