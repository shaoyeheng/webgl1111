<template>
	<div class="box">
		<el-row :gutter="20">
			<el-col :span="6">
				<div class="grid-content ">
					<el-button @mousedown.native="zoomIn" @touchstart.native.prevent="zoomIn" @touchend.native.prevent="moveEnd"  @mouseup.native="moveEnd" plain type="primary" icon="el-icon-zoom-in"
						circle></el-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ">
					<el-button @mousedown.native="moveUp" @touchstart.native.prevent="moveUp" @touchend.native.prevent="moveEnd"   @mouseup.native="moveEnd" plain type="success" icon="el-icon-arrow-up"
						circle></el-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ">
					<el-button @mousedown.native="zoomOut" @touchstart.native.prevent="zoomOut" @touchend.native.prevent="moveEnd"  @mouseup.native="moveEnd" plain type="primary" icon="el-icon-zoom-out"
						circle></el-button>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20" style="margin-top:  1rem;margin-bottom: 1rem;">
			<el-col :span="6">
				<div class="grid-content ">
					<el-button @mousedown.native="moveLeft"  @touchstart.native.prevent="moveLeft" @touchend.native.prevent="moveEnd" @mouseup.native="moveEnd" plain type="success" icon="el-icon-arrow-left"
						circle></el-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ">
					<el-button @click="zoomback" plain type="success" icon="el-icon-refresh-right" circle></el-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ">
					<el-button @mousedown.native="moveRight"  @touchstart.native.prevent="moveRight" @touchend.native.prevent="moveEnd" @mouseup.native="moveEnd" plain type="success" icon="el-icon-arrow-right"
						circle></el-button>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="6">
				<div class="grid-content ">&nbsp;</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ">
					<el-button @mousedown.native="moveDown"  @touchstart.native.prevent="moveDown" @touchend.native.prevent="moveEnd" @mouseup.native="moveEnd" plain type="success" icon="el-icon-arrow-down"
						circle></el-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ">&nbsp;</div>
			</el-col>
		</el-row>
		<!-- {{message}} -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				message: "send to up data"
			}
		},
		methods: {
			clickHandle(type) {
				this.$emit("onSend", type);
			},
			zoomback() {
				this.clickHandle("zoomback")
			},
			moveUp() {
				this.clickHandle("moveUp")
			},
			moveDown() {
				this.clickHandle("moveDown")
			},
			moveLeft() {
				this.clickHandle("moveLeft")
			},
			moveRight() {
				this.clickHandle("moveRight")
			},
			zoomIn() {
				this.clickHandle("zoomIn")
				// this.$message('zoomIn');

			},
			
			zoomOut() {
				this.clickHandle("zoomOut")
			},
			moveEnd() {
				this.clickHandle("moveEnd")
				// this.$message('moveEnd');
			},
			
		}
	}
</script>

<style>
	.box {
		background-color: rgba(#ffffff11);
		width: 180px;

		.top {
			float: top;
			text-align: center;
		}

		.left {
			float: left;
			width: 60px;
		}

		.right {
			float: right;
			width: 60px;
		}

		.bottom {
			clear: both;
			text-align: center;
		}

		.grid-content {
			clear: both;
			text-align: center;
		}

		.item {
			margin: 4px;
		}

		.left .el-tooltip__popper,
		.right .el-tooltip__popper {
			padding: 8px 10px;
		}
	}
</style>
