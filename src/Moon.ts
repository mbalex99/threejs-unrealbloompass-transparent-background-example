import { Mesh, MeshBasicMaterial, Plane, ShaderMaterial, SphereGeometry, Vector3 } from "three";
import _ from "lodash";

const colors = [0xff9500, 0x00bc7f, 0xf856b3, 0x5f43e9];

class Moon extends Mesh {
  orbitSpeed: number;
  angle: Vector3;
  nucleus: Mesh;

  constructor(nucleus: Mesh) {
    const randomRadius = _.random(0.5, 1.2);
    const moonGeo = new SphereGeometry(randomRadius, 32, 32);
    const moonMaterial = new MeshBasicMaterial({ color: _.sample(colors) });
    super(moonGeo, moonMaterial);
    this.nucleus = nucleus;

    const plane = new Plane();
    const point = new Vector3();
    this.angle = new Vector3(
      Math.random(),
      Math.random(),
      Math.random()
    ).normalize();
    this.orbitSpeed = _.random(-0.002, 0.002);
    plane.normal.copy(this.angle);
    point.set(Math.random(), Math.random(), Math.random());
    plane.projectPoint(point, this.position);
    this.position.setLength(_.random(15, 50));
    this.position.applyAxisAngle(this.angle, Math.random() / 10);
    this.position.add(this.nucleus.position);
  }

  render() {
    this.position.sub(this.nucleus.position);
    this.position.applyAxisAngle(this.angle, this.orbitSpeed);
    this.position.add(this.nucleus.position);
  }
}

export default Moon;
