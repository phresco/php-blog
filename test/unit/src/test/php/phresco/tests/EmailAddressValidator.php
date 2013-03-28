<?php /*
/*
 * PHR_PhpBlog
 *
 * Copyright (C) 1999-2013 Photon Infotech Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
*/ ?>
<?php

/*	Author by {phresco} QA Automation Team	*/

require_once 'PHPUnit/Framework.php';
require_once 'phresco/tests/EmailAddress.php';
class EmailAddressValidator extends PHPUnit_Framework_TestCase {
        public function setUp() 
		{
            $this->objValidator = new EmailAddress;
        }

        public function testValidation() 
		{
            $this->assertEquals(true, $this->objValidator->check_email_address('test@example.com'));
        }
}
?>